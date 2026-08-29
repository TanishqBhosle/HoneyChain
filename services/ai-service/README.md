# Honey Chain AI Service

Provides endpoints for disease detection using MobileNetV3 and yield prediction using GradientBoostingRegressor.

## Quickstart

```bash
pip install -r requirements.txt
python app/main.py
```

## Docker

```bash
docker build -t honey-ai-service .
docker run -p 8000:8000 honey-ai-service
```
