from app.models.yield_regressor import YieldRegressor
import asyncio

class YieldService:
    def __init__(self, regressor: YieldRegressor):
        self.regressor = regressor
        
    async def predict_yield(self, features: dict):
        # Offload to thread pool
        loop = asyncio.get_event_loop()
        result = await loop.run_in_executor(None, self.regressor.predict, features)
        return result
