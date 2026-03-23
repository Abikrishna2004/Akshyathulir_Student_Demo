from pymongo import MongoClient
import datetime
import os

# To use MongoDB Atlas, replace <YOUR_CLUSTER_DOMAIN> below with your actual cluster domain.
# Example: cluster0.abcd1.mongodb.net
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
    
    counter_doc = counters_collection.find_one_and_update(
        {"_id": counter_id},
        {"$inc": {"seq": 1}},
        return_document=True
    )
    
    if counter_doc:
        next_sequence = counter_doc["seq"]
    else:
        latest_doc = collection.find_one(
            {"_id": {"$regex": f"^{prefix}"}},
            sort=[("_id", -1)]
        )
        
        current_max_seq = 0
        if latest_doc:
            last_id = latest_doc["_id"]
            try:
                current_max_seq = int(last_id[-3:])
            except ValueError:
                pass
        
        next_sequence = current_max_seq + 1
        
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

# Dashboard Collections
dashboard_collection = db["Main_Dashboard"]

def get_dashboard_data():
    doc = dashboard_collection.find_one({}, {"_id": 0})
    if doc:
        return doc
    return {
        "stats": [],
        "kpiStats": [],
        "chartData": [],
        "pipelineData": [],
        "fundingData": [],
        "stageData": []
    }

def init_dashboard_data():
    if dashboard_collection.count_documents({}) == 0:
        dashboard_collection.insert_one({
            "stats": [
                { "title": "Active Startups", "value": "58", "change": "+25%", "trend": "up", "icon": "RocketLaunch", "color": "#15573F", "growth": 82 },
                { "title": "IP / Patents", "value": "24", "change": "+33%", "trend": "up", "icon": "Gavel", "color": "#15573F", "growth": 78 },
                { "title": "Industry Partners", "value": "32", "change": "+20%", "trend": "up", "icon": "Handshake", "color": "#15573F", "growth": 88 },
                { "title": "Research Projects", "value": "156", "change": "+18%", "trend": "up", "icon": "Science", "color": "#15573F", "growth": 92 },
                { "title": "Students Placed", "value": "552", "change": "+5%", "trend": "up", "icon": "School", "color": "#15573F", "growth": 48 }
            ],
            "kpiStats": [
                { "title": "Industry Collaborations", "subtitle": "Active partnerships", "value": "48", "change": "+12%", "icon": "BusinessCenter", "color": "#15573F", "trendData": [42, 45, 47, 48, 50] },
                { "title": "Total Funding", "subtitle": "Raised this quarter", "value": "₹6.8Cr", "change": "+24%", "icon": "CurrencyRupee", "color": "#15573F", "trendData": [4.8, 5.5, 6.2, 6.8, 7.5] },
                { "title": "Awards Received", "subtitle": "National/International", "value": "24", "change": "+18%", "icon": "EmojiEvents", "color": "#15573F", "trendData": [20, 21, 22, 23, 24] },
                { "title": "Success Rate", "subtitle": "Graduated startups", "value": "84%", "change": "+8%", "icon": "TrendingUp", "color": "#15573F", "trendData": [80, 81, 82, 83, 84] }
            ],
            "chartData": [
                { "name": "Jan", "startups": 32, "funding": 45, "partnerships": 22 },
                { "name": "Feb", "startups": 38, "funding": 52, "partnerships": 26 },
                { "name": "Mar", "startups": 45, "funding": 65, "partnerships": 30 },
                { "name": "Apr", "startups": 58, "funding": 82, "partnerships": 35 }
            ],
            "pipelineData": [
                { "stage": "Ideation", "value": 65, "color": "#2196F3", "count": 28 },
                { "stage": "Prototype", "value": 40, "color": "#FF9800", "count": 17 },
                { "stage": "Market Ready", "value": 15, "color": "#4CAF50", "count": 6 },
                { "stage": "Scaling", "value": 8, "color": "#9C27B0", "count": 3 }
            ],
            "fundingData": [
                { "type": "Seed", "amount": 28, "color": "#2E8B57", "percentage": 42 },
                { "type": "Series A", "amount": 18, "color": "#3CB371", "percentage": 27 },
                { "type": "Series B", "amount": 12, "color": "#66CDAA", "percentage": 18 },
                { "type": "Series C+", "amount": 8, "color": "#98FB98", "percentage": 13 }
            ],
            "stageData": [
                { "name": "Tech", "value": 35, "color": "#2E8B57" },
                { "name": "Social", "value": 25, "color": "#3CB371" },
                { "name": "Healthcare", "value": 20, "color": "#66CDAA" },
                { "name": "Education", "value": 15, "color": "#98FB98" },
                { "name": "FinTech", "value": 10, "color": "#A9DFBF" }
            ]
        })
