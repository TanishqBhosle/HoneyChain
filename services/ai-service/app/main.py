from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.core.config import settings
from app.api.v1.router import api_router
from app.models.disease_classifier import DiseaseClassifier
from app.models.yield_regressor import YieldRegressor
from app.services.disease_service import DiseaseService
from app.services.yield_service import YieldService

# Global service references
disease_service = None
yield_service = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global disease_service, yield_service
    print("Loading models...")
    disease_classifier = DiseaseClassifier(settings.DISEASE_MODEL_PATH)
    yield_regressor = YieldRegressor(settings.YIELD_MODEL_PATH)
    
    disease_service = DiseaseService(disease_classifier)
    yield_service = YieldService(yield_regressor)
    print("Models loaded successfully.")
    
    yield
    print("Cleaning up models...")
    disease_service = None
    yield_service = None

app = FastAPI(
    title=settings.PROJECT_NAME,
    lifespan=lifespan
)

# App state injection
@app.middleware("http")
async def add_services_to_request(request, call_next):
    request.state.disease_service = disease_service
    request.state.yield_service = yield_service
    response = await call_next(request)
    return response

app.include_router(api_router, prefix=settings.API_V1_STR)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
