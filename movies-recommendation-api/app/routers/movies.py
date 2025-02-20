from fastapi import APIRouter, Query

from app.config.config import settings
from app.models.response import ResponseModel
from app.config.db import MongoDB
from app.utils import serializer


router = APIRouter()
ACCESS_TOKEN_EXPIRES_IN = settings.ACCESS_TOKEN_EXPIRES_IN
REFRESH_TOKEN_EXPIRES_IN = settings.REFRESH_TOKEN_EXPIRES_IN

db = MongoDB()


@router.get("/search", response_model=ResponseModel)
def search(q: str = Query(..., min_length=1)):
    regex_query = {"title": {"$regex": q, "$options": "i"}}
    documents = [serializer.serialize_document(
        doc) for doc in db.find('movies', regex_query)]
    return ResponseModel(status="success", data=documents, message="Fetched Successfully")


@router.get('', response_model=ResponseModel)
def get_all_movies():
    documents = [serializer.serialize_document(
        doc) for doc in db.find('movies', {})]
    return ResponseModel(status="success", data=documents, message="Fetched All Movies Successfully")
