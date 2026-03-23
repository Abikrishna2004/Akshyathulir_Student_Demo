from fastapi import APIRouter, HTTPException
from models import InstitutionSchema
import crud

router = APIRouter()

@router.post("/register")
async def register_institution(payload: InstitutionSchema):
    try:
        data = payload.model_dump()
        
        
        data["yearEstablished"] = int(data["yearEstablished"])
        
        new_id = await crud.create_institution(data)
        return {"message": "Data stored successfully", "id": new_id}
    except Exception as e:
        print(f"CRITICAL ERROR: {e}") 
        raise HTTPException(status_code=500, detail=str(e))