from database import institution_collection

async def create_institution(data: dict):
    result = await institution_collection.insert_one(data)
    return str(result.inserted_id)

async def get_all_institutions():
    institutions = []
    async for item in institution_collection.find():
        item["_id"] = str(item["_id"])
        institutions.append(item)
    return institutions