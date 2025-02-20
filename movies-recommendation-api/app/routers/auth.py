from fastapi import APIRouter, Response
from app.models.response import ResponseModel
from app.config.db import MongoDB
from app.config.config import settings
from app.utils import serializer

router = APIRouter()
ACCESS_TOKEN_EXPIRES_IN = settings.ACCESS_TOKEN_EXPIRES_IN
REFRESH_TOKEN_EXPIRES_IN = settings.REFRESH_TOKEN_EXPIRES_IN

db = MongoDB()


@router.post('/createUser', status_code=201)
def create_user():
    """calling api"""
    collection = db.get_collection("temp_users")
    t_user = collection.insert_one({}).inserted_id
    print(str(t_user))
    return ResponseModel(status="201", data=str(t_user), message="Created Successfully")
