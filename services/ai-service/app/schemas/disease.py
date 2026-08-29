from pydantic import BaseModel, Field
from typing import List, Optional

class DiseasePredictionResponse(BaseModel):
    prediction: str
    confidence: float
    severity: str
    recommendation: str
    top_k: List[dict]
    inference_time_ms: float
