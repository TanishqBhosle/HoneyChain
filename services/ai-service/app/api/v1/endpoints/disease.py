from fastapi import APIRouter, UploadFile, File, HTTPException, Request
from app.schemas.disease import DiseasePredictionResponse

router = APIRouter()

@router.post("/disease", response_model=DiseasePredictionResponse)
async def predict_disease(request: Request, file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(400, detail="File must be an image")
    
    contents = await file.read()
    if len(contents) > 10 * 1024 * 1024:
        raise HTTPException(400, detail="File size exceeds 10MB limit")
        
    try:
        service = request.state.disease_service
        result = await service.predict_disease(contents)
        return result
    except Exception as e:
        raise HTTPException(500, detail=str(e))
