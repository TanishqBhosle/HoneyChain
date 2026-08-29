from app.models.disease_classifier import DiseaseClassifier
from PIL import Image
import io
import time
import asyncio

class DiseaseService:
    def __init__(self, classifier: DiseaseClassifier):
        self.classifier = classifier
        
    async def predict_disease(self, image_bytes: bytes):
        start = time.time()
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        
        # Offload CPU-bound inference to thread pool
        loop = asyncio.get_event_loop()
        result = await loop.run_in_executor(None, self.classifier.predict, image)
        
        inference_time_ms = (time.time() - start) * 1000
        result["inference_time_ms"] = round(inference_time_ms, 2)
        return result
