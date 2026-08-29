import pandas as pd
from sklearn.ensemble import GradientBoostingRegressor
import joblib
import os

def train_yield_model():
    print("Training Yield Regressor...")
    try:
        df = pd.read_csv("synthetic_yield_data.csv")
    except FileNotFoundError:
        print("Run generate_synthetic_data.py first.")
        return
        
    X = df.drop("actual_yield_kg", axis=1)
    y = df["actual_yield_kg"]
    
    model = GradientBoostingRegressor(n_estimators=100, random_state=42)
    model.fit(X, y)
    
    os.makedirs("../weights", exist_ok=True)
    joblib.dump(model, "../weights/yield_model.joblib")
    print("Model trained and saved to weights/yield_model.joblib")

if __name__ == "__main__":
    train_yield_model()
