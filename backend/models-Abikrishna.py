from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional

class Address(BaseModel):
    country: str
    state: str
    district: str
    city: str
    area: str
    pinCode: str

class Contact(BaseModel):
    name: str
    email: EmailStr
    phone: str

class SocialLinks(BaseModel):
    website: Optional[str] = None
    linkedin: Optional[str] = None
    instagram: Optional[str] = None
    facebook: Optional[str] = None

class PersonalInfo(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr
    phone: str
    gender: str
    designation: str

class Contacts(BaseModel):
    principal: Contact
    vicePrincipal: Optional[Contact] = None
    ceo: Optional[Contact] = None
    academicCoordinator: Optional[Contact] = None
    placementHead: Optional[Contact] = None

class InstitutionRegistration(BaseModel):
    institutionName: str
    institutionType: str
    autonomousStatus: Optional[str] = None
    yearEstablished: str
    naacGrade: str
    officialEmail: EmailStr
    universityName: Optional[str] = None
    degrees: List[str]
    departments: List[str]
    personalInfo: PersonalInfo
    contacts: Contacts
    address: Address
    socialLinks: SocialLinks

class InstitutionInDB(InstitutionRegistration):
    id: str = Field(alias="_id")
    mongo_id: str  # Original MongoDB ObjectID as string

    class Config:
        populate_by_name = True
