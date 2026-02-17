from fastapi import FastAPI, HTTPException, Body, File, UploadFile
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional, Dict
from pydantic import BaseModel, Field, EmailStr
import database as db
import shutil
import os

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount uploads directory to serve static files
if not os.path.exists("uploads"):
    os.makedirs("uploads")
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# --- Pydantic Models ---

class Address(BaseModel):
    country: str
    state: str
    district: str
    city: str
    area: str
    pinCode: str

class Contact(BaseModel):
    name: str = ""
    email: str = ""
    phone: str = ""

class PersonalInfo(BaseModel):
    firstName: str
    lastName: str
    email: str
    phone: str
    gender: str
    designation: str
    dateOfBirth: str = ""

class Contacts(BaseModel):
    principal: Contact
    vicePrincipal: Optional[Contact] = None
    ceo: Optional[Contact] = None
    academicCoordinator: Optional[Contact] = None
    placementHead: Optional[Contact] = None

class SocialLinks(BaseModel):
    website: str = ""
    linkedin: str = ""
    instagram: str = ""
    facebook: str = ""

class InstitutionCreate(BaseModel):
    institutionName: str
    institutionType: str
    autonomousStatus: str = ""
    yearEstablished: str
    naacGrade: str
    officialEmail: str
    universityName: str = ""
    degrees: List[str] = []
    departments: List[str] = []
    personalInfo: PersonalInfo
    contacts: Contacts
    address: Address
    socialLinks: SocialLinks
    documents: Dict[str, str] = {} # Key: Document Name (e.g., "ID Proof"), Value: URL/Path

class Institution(InstitutionCreate):
    id: str = Field(alias="_id")
    created_at: str

    class Config:
        populate_by_name = True

# --- API Endpoints ---

@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        file_location = f"uploads/{file.filename}"
        with open(file_location, "wb+") as file_object:
            shutil.copyfileobj(file.file, file_object)
        return {"filename": file.filename, "url": f"http://localhost:8000/uploads/{file.filename}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/institution/register", response_model=dict)
def register_institution(institution: InstitutionCreate):
    try:
        data = institution.dict()
        new_id = db.create_institution(data)
        return {"id": new_id, "message": f"Registration successful with ID: {new_id}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/institution", response_model=List[Institution])
def get_institutions():
    try:
        institutions = db.get_all_institutions()
        # Ensure _id is mapped correctly and date format handled if needed
        for inst in institutions:
             inst["_id"] = str(inst["_id"])
             if "created_at" in inst:
                 inst["created_at"] = inst["created_at"].isoformat()
        return institutions
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/institution/{id}", response_model=Institution)
def get_institution(id: str):
    institution = db.get_institution(id)
    if not institution:
        raise HTTPException(status_code=404, detail="Institution not found")
    institution["_id"] = str(institution["_id"])
    if "created_at" in institution:
        institution["created_at"] = institution["created_at"].isoformat()
    return institution

@app.put("/api/institution/{id}", response_model=dict)
def update_institution(id: str, institution: InstitutionCreate):
    updated = db.update_institution(id, institution.dict())
    if not updated:
        raise HTTPException(status_code=404, detail="Institution not found or no changes made")
    return {"message": "Institution updated successfully"}

@app.delete("/api/institution/{id}", response_model=dict)
def delete_institution(id: str):
    # Retrieve institution to get file paths
    institution = db.get_institution(id)
    if institution and "documents" in institution:
        for doc_name, file_url in institution["documents"].items():
            if file_url:
                try:
                    # Extract filename from URL (assuming format http://.../uploads/filename)
                    filename = file_url.split("/")[-1]
                    file_path = os.path.join("uploads", filename)
                    if os.path.exists(file_path):
                        os.remove(file_path)
                except Exception as e:
                    print(f"Error deleting file {file_url}: {e}")

    deleted = db.delete_institution(id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Institution not found")
    return {"message": "Institution deleted successfully"}

@app.get("/api/institution/email/{email}", response_model=Institution)
def get_institution_by_email(email: str):
    institution = db.get_institution_by_email(email)
    if not institution:
        raise HTTPException(status_code=404, detail="Institution not found")
    institution["_id"] = str(institution["_id"])
    if "created_at" in institution:
        institution["created_at"] = institution["created_at"].isoformat()
    return institution

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
