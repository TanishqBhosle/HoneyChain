from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Honey Chain AI Service"
    API_V1_STR: str = "/api/v1"
    DISEASE_MODEL_PATH: str = "weights/disease_model.pth"
    YIELD_MODEL_PATH: str = "weights/yield_model.joblib"
    DEMO_MODE: bool = False
    
    class Config:
        case_sensitive = True

settings = Settings()
