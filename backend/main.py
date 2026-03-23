from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import router as InstitutionRouter

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(InstitutionRouter, prefix="/api/institution", tags=["Institution"])  