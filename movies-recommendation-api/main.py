from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel

from app.config.db import MongoDB
from app.routers import movies
from app.config.config import settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    db = MongoDB()
    yield
    db.close()

origins = [
    settings.CLIENT_ORIGIN,
]

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

app.include_router(movies.router, tags=['Auth'], prefix='/api/movies')
