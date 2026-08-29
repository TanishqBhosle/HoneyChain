from fastapi import APIRouter, Request, HTTPException
from app.schemas.yield_pred import YieldPredictionRequest, YieldPredictionResponse

router = APIRouter()

@router.post("/yield", response_model=YieldPredictionResponse)
async def predict_yield(request: Request, data: YieldPredictionRequest):
    try:
        service = request.state.yield_service
        result = await service.predict_yield(data.model_dump())
        return result
    except Exception as e:
        raise HTTPException(500, detail=str(e))
