import pandas as pd
import numpy as np
import random

def generate_data(n_samples=500):
    data = []
    for _ in range(n_samples):
        hist_yield = random.uniform(10.0, 50.0)
        health = random.uniform(40.0, 100.0)
        temp = random.uniform(15.0, 35.0)
        hum = random.uniform(30.0, 90.0)
        season = random.choice([1, 2, 3, 4, 5]) # 1: spring, 2: summer, 3: monsoon, 4: autumn, 5: winter
        trend = random.uniform(-2.0, 5.0)
        strength = random.uniform(0.5, 1.0)
        
        # Simple generation logic
        actual_yield = hist_yield * (health/100) * strength + (temp/100) + trend
        
        data.append({
            "historical_yield_kg": hist_yield,
            "health_score": health,
            "avg_temperature": temp,
            "avg_humidity": hum,
            "season": season,
            "weight_trend": trend,
            "colony_strength": strength,
            "actual_yield_kg": actual_yield
        })
        
    df = pd.DataFrame(data)
    df.to_csv("synthetic_yield_data.csv", index=False)
    print(f"Generated {n_samples} samples.")

if __name__ == "__main__":
    generate_data()
