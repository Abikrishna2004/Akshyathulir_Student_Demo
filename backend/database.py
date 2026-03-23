import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

# This pulls the localhost URI you set in your .env
MONGO_URI = os.getenv("MONGO_URI") 
DATABASE_NAME = os.getenv("DATABASE_NAME")

client = AsyncIOMotorClient(MONGO_URI)
db = client[DATABASE_NAME]

# This is the collection that will hold your form data
institution_collection = db.get_collection("institutions")