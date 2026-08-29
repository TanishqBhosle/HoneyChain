from fastapi import APIRouter
from app.api.v1.endpoints import health, disease, yield_pred

api_router = APIRouter()
api_router.include_router(health.router, tags=["health"])
api_router.include_router(disease.router, prefix="/predict", tags=["disease"])
api_router.include_router(yield_pred.router, prefix="/predict", tags=["yield"])
