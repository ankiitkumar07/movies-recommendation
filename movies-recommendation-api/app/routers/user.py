from fastapi import APIRouter, Request, Response, status, Depends, HTTPException

from ..config import settings

router = APIRouter()

ACCESS_TOKEN_EXPIRES_IN = settings.ACCESS_TOKEN_EXPIRES_IN
REFRESH_TOKEN_EXPIRES_IN = settings.REFRESH_TOKEN_EXPIRES_IN
