from pymongo import MongoClient
import datetime
import os

MONGO_URI = "mongodb://localhost:27017/"
DATABASE_NAME = "Incubation_center"

client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]
collection = db["institutions"]

counters_collection = db["counters"]

def get_next_edu_id():
    now = datetime.datetime.now()
    year_month = now.strftime("%Y%m")  
    prefix = f"Edu{year_month}"
    counter_id = f"counter_{prefix}"
    
    # Try to atomically increment the counter
    counter_doc = counters_collection.find_one_and_update(
        {"_id": counter_id},
        {"$inc": {"seq": 1}},
        return_document=True
    )
    
    if counter_doc:
        # Counter existed and was incremented
        next_sequence = counter_doc["seq"]
    else:
        # Counter didn't exist, initialize it based on existing data to maintain continuity
        latest_doc = collection.find_one(
            {"_id": {"$regex": f"^{prefix}"}},
            sort=[("_id", -1)]
        )
        
        current_max_seq = 0
        if latest_doc:
            last_id = latest_doc["_id"]
            try:
                # Extract the numeric part (last 3 digits)
                current_max_seq = int(last_id[-3:])
            except ValueError:
                pass
        
        next_sequence = current_max_seq + 1
        
        # Insert the new counter. Handle potential race condition if created concurrently.
        try:
            counters_collection.insert_one({"_id": counter_id, "seq": next_sequence})
        except Exception:
            # If insert fails (DuplicateKeyError), it means another request just created it.
            # So we increment the existing one.
            counter_doc = counters_collection.find_one_and_update(
                {"_id": counter_id},
                {"$inc": {"seq": 1}},
                return_document=True
            )
            next_sequence = counter_doc["seq"]
            
    return f"{prefix}{next_sequence:03d}"

def create_institution(data: dict):
    new_id = get_next_edu_id()
    data["_id"] = new_id
    data["created_at"] = datetime.datetime.utcnow()
    result = collection.insert_one(data)
    return new_id

def get_all_institutions():
    return list(collection.find())

def get_institution(edu_id: str):
    return collection.find_one({"_id": edu_id})

def update_institution(edu_id: str, data: dict):
    result = collection.update_one({"_id": edu_id}, {"$set": data})
    return result.modified_count > 0

def delete_institution(edu_id: str):
    result = collection.delete_one({"_id": edu_id})
    return result.deleted_count > 0

def get_institution_by_email(email: str):
    return collection.find_one({"personalInfo.email": email}, sort=[("_id", -1)])
