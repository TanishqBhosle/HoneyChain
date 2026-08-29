from fastapi import APIRouter, Request

router = APIRouter()

@router.get("/health")
def health_check():
    return {"status": "ok"}

@router.get("/ready")
def readiness_check(request: Request):
    if request.state.disease_service and request.state.yield_service:
        return {"status": "ready"}
    return {"status": "not_ready"}, 503
