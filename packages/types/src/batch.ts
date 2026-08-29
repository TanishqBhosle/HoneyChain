export interface HoneyBatch {
  id: string;
  beekeeperId: string;
  apiaryId: string;
  hiveIds: string[];
  harvestDate: Date;
  honeyType: string;
  estimatedQuantityKg: number;
  status: 'CREATED' | 'COLLECTED' | 'TESTED' | 'APPROVED' | 'PROCESSED' | 'PACKAGED' | 'DISTRIBUTED' | 'SOLD';
}

export interface BatchEvent {
  id: string;
  batchId: string;
  eventType: string;
  actorUserId: string;
  timestamp: Date;
  notes?: string;
}
