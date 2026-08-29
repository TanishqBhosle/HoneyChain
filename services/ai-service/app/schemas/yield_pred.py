from pydantic import BaseModel
from typing import Literal

class YieldPredictionRequest(BaseModel):
    historical_yield_kg: float
    health_score: float
    avg_temperature: float
    avg_humidity: float
    season: Literal["spring", "summer", "monsoon", "autumn", "winter"]
    weight_trend: float
    colony_strength: float

class YieldPredictionResponse(BaseModel):
    predicted_yield_kg: float
    confidence_pct: float
    range_low: float
    range_high: float
    recommendation: str
