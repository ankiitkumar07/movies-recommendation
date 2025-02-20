from fastapi import APIRouter, HTTPException
from bson.objectid import ObjectId
from typing import List

from app.config.db import MongoDB
from app.config.config import settings
from app.models.response import ResponseModel

router = APIRouter()
ACCESS_TOKEN_EXPIRES_IN = settings.ACCESS_TOKEN_EXPIRES_IN
REFRESH_TOKEN_EXPIRES_IN = settings.REFRESH_TOKEN_EXPIRES_IN

db = MongoDB()


@router.patch('/{user_id}/movies',)
def save_user_movies(user_id: str, movies: List[str]):
    collection = db.get_collection('temp_users')
    user = collection.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    result = collection.update_one({
        "_id": ObjectId(user_id)
    }, {"$addToSet": {
        "movies": {"$each": movies}
    }})

    return ResponseModel(status="204", data=f"{len(movies)} added to user {user_id}", message="success")
