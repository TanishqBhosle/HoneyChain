// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title HoneyTraceability
 * @notice Manages immutable batch history and verification hashes for the honey supply chain.
 * @dev Only stores hashes and small structured fields on-chain — never raw images or bulk data.
 */
contract HoneyTraceability is AccessControl {
    bytes32 public constant BEEKEEPER_ROLE = keccak256("BEEKEEPER_ROLE");
    bytes32 public constant COLLECTION_CENTER_ROLE = keccak256("COLLECTION_CENTER_ROLE");
    bytes32 public constant QUALITY_INSPECTOR_ROLE = keccak256("QUALITY_INSPECTOR_ROLE");
    bytes32 public constant PROCESSOR_ROLE = keccak256("PROCESSOR_ROLE");
    bytes32 public constant DISTRIBUTOR_ROLE = keccak256("DISTRIBUTOR_ROLE");

    enum Stage {
        Harvested,
        Collected,
        QualityTested,
        Processed,
        Packaged,
        InTransit,
        Delivered,
        Recalled
    }

    // Packed into 2 storage slots
    struct Batch {
        address creator;        // 20 bytes  |
        uint64 createdAt;       // 8 bytes   | Slot 1 (30 bytes)
        Stage currentStage;     // 1 byte    |
        bool isRecalled;        // 1 byte    |
        bytes32 latestDataHash; // 32 bytes    Slot 2
    }

    // Packed into 2 storage slots
    struct BatchEvent {
        address actor;          // 20 bytes  |
        uint64 timestamp;       // 8 bytes   | Slot 1 (30 bytes)
        Stage stage;            // 1 byte    |
        bool verified;          // 1 byte    |
        bytes32 dataHash;       // 32 bytes    Slot 2
    }

    mapping(bytes32 => Batch) private _batches;
    mapping(bytes32 => BatchEvent[]) private _batchHistory;
    uint256 public totalBatches;

    event BatchCreated(bytes32 indexed batchId, address indexed creator, bytes32 initialHash, uint64 timestamp);
    event BatchEventRecorded(bytes32 indexed batchId, Stage indexed stage, bytes32 indexed dataHash, address actor, uint64 timestamp);
    event OwnershipTransferred(bytes32 indexed batchId, address indexed newOwner, uint64 timestamp);
    event BatchRecalled(bytes32 indexed batchId, address indexed actor, string reason);

    error BatchAlreadyExists(bytes32 batchId);
    error BatchNotFound(bytes32 batchId);
    error BatchIsRecalled(bytes32 batchId);
    error InvalidDataHash();
    error NotBatchOwner(bytes32 batchId, address caller);

    constructor(address admin) {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
    }

    /**
     * @notice Creates a new honey batch at the Harvested stage.
     * @param batchId keccak256 hash of the off-chain batch ID string
     * @param initialDataHash keccak256 hash of the initial off-chain event payload
     */
    function createBatch(bytes32 batchId, bytes32 initialDataHash) external onlyRole(BEEKEEPER_ROLE) {
        if (initialDataHash == bytes32(0)) revert InvalidDataHash();
        if (_batches[batchId].createdAt != 0) revert BatchAlreadyExists(batchId);

        uint64 timestamp = uint64(block.timestamp);

        _batches[batchId] = Batch({
            creator: msg.sender,
            createdAt: timestamp,
            currentStage: Stage.Harvested,
            isRecalled: false,
            latestDataHash: initialDataHash
        });

        _batchHistory[batchId].push(BatchEvent({
            actor: msg.sender,
            timestamp: timestamp,
            stage: Stage.Harvested,
            verified: true,
            dataHash: initialDataHash
        }));

        totalBatches++;

        emit BatchCreated(batchId, msg.sender, initialDataHash, timestamp);
    }

    /**
     * @notice Appends a lifecycle event to an existing batch with role-based authorization.
     * @dev Role is checked based on the target stage. Any authorized role holder can add events
     *      to any batch — they don't need to be the batch owner.
     * @param batchId The batch to update
     * @param eventDataHash Hash of the off-chain event data
     * @param nextStage Target lifecycle stage
     */
    function addBatchEvent(bytes32 batchId, bytes32 eventDataHash, Stage nextStage) external {
        Batch storage batch = _batches[batchId];
        if (batch.createdAt == 0) revert BatchNotFound(batchId);
        if (batch.isRecalled) revert BatchIsRecalled(batchId);
        if (eventDataHash == bytes32(0)) revert InvalidDataHash();

        // Role check based on target stage
        if (nextStage == Stage.Collected) {
            _checkRole(COLLECTION_CENTER_ROLE);
        } else if (nextStage == Stage.QualityTested) {
            _checkRole(QUALITY_INSPECTOR_ROLE);
        } else if (nextStage == Stage.Processed || nextStage == Stage.Packaged) {
            _checkRole(PROCESSOR_ROLE);
        } else if (nextStage == Stage.InTransit || nextStage == Stage.Delivered) {
            _checkRole(DISTRIBUTOR_ROLE);
        }

        uint64 timestamp = uint64(block.timestamp);

        // Hash chaining: link previous state with new data for tamper evidence
        bytes32 chainedHash = keccak256(abi.encodePacked(batch.latestDataHash, eventDataHash, msg.sender, timestamp));

        batch.currentStage = nextStage;
        batch.latestDataHash = chainedHash;

        _batchHistory[batchId].push(BatchEvent({
            actor: msg.sender,
            timestamp: timestamp,
            stage: nextStage,
            verified: true,
            dataHash: chainedHash
        }));

        emit BatchEventRecorded(batchId, nextStage, chainedHash, msg.sender, timestamp);
    }

    /**
     * @notice Transfers batch custody (e.g., beekeeper → collection center).
     */
    function transferOwnership(bytes32 batchId, address newOwner) external {
        Batch storage batch = _batches[batchId];
        if (batch.createdAt == 0) revert BatchNotFound(batchId);
        if (batch.isRecalled) revert BatchIsRecalled(batchId);
        if (batch.creator != msg.sender) revert NotBatchOwner(batchId, msg.sender);

        batch.creator = newOwner;
        emit OwnershipTransferred(batchId, newOwner, uint64(block.timestamp));
    }

    /**
     * @notice Emergency batch recall — only admin or quality inspector.
     */
    function recallBatch(bytes32 batchId, string calldata reason) external {
        Batch storage batch = _batches[batchId];
        if (batch.createdAt == 0) revert BatchNotFound(batchId);

        if (!hasRole(DEFAULT_ADMIN_ROLE, msg.sender) && !hasRole(QUALITY_INSPECTOR_ROLE, msg.sender)) {
            revert AccessControlUnauthorizedAccount(msg.sender, QUALITY_INSPECTOR_ROLE);
        }

        batch.isRecalled = true;
        batch.currentStage = Stage.Recalled;

        uint64 timestamp = uint64(block.timestamp);

        _batchHistory[batchId].push(BatchEvent({
            actor: msg.sender,
            timestamp: timestamp,
            stage: Stage.Recalled,
            verified: true,
            dataHash: bytes32(0)
        }));

        emit BatchRecalled(batchId, msg.sender, reason);
    }

    // ─── View Functions ─────────────────────────────────────────────────

    function getBatch(bytes32 batchId) external view returns (Batch memory) {
        if (_batches[batchId].createdAt == 0) revert BatchNotFound(batchId);
        return _batches[batchId];
    }

    function getBatchHistory(bytes32 batchId) external view returns (BatchEvent[] memory) {
        if (_batches[batchId].createdAt == 0) revert BatchNotFound(batchId);
        return _batchHistory[batchId];
    }

    function getBatchEventCount(bytes32 batchId) external view returns (uint256) {
        return _batchHistory[batchId].length;
    }

    /**
     * @notice Checks if a specific data hash exists in the batch's event history.
     * @dev Used by the verification API to confirm off-chain data matches on-chain records.
     */
    function verifyBatch(bytes32 batchId, bytes32 dataHash) external view returns (bool) {
        if (_batches[batchId].createdAt == 0) revert BatchNotFound(batchId);
        BatchEvent[] memory history = _batchHistory[batchId];
        for (uint256 i = 0; i < history.length; i++) {
            if (history[i].dataHash == dataHash) {
                return true;
            }
        }
        return false;
    }
}
