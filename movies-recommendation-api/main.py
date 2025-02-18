from fastapi import FastAPI, Query
from pydantic import BaseModel
from typing import List

from fastapi.middleware.cors import CORSMiddleware

from response import ResponseModel

from db import connect_to_mongo

app = FastAPI()


def serialize_document(doc):
    """
    Helper function to convert ObjectId fields to string
    """
    if '_id' in doc:
        doc['_id'] = str(doc['_id'])  # Convert ObjectId to string
    return doc


@app.on_event("startup")
async def startup():
    global client 
    client = connect_to_mongo()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)


# Movie recommendation data structure
class MovieRecommendation(BaseModel):
    movie_name: str

# Endpoint to receive 3 favorite movies
@app.post("/api/recommend")
def recommend_movies(movies: List[MovieRecommendation]):
    # This would usually use a model to generate recommendations
    recommendations = [
        "Movie 1", "Movie 2", "Movie 3", "Movie 4", "Movie 5", 
        "Movie 6", "Movie 7", "Movie 8", "Movie 9", "Movie 10"
    ]
    return {"recommended_movies": recommendations}

# Endpoint to store movie selections
@app.post("/api/store-selection")
def store_selection(selected_movies: List[MovieRecommendation]):
    # Here, you'd save data to a database
    return {"message": "Selections saved successfully!"}



# Endpoint to store movie selections
@app.get("/api/search", response_model=ResponseModel)
def search(q: str = Query(..., min_length=1)):
    # Here, you'd save data to a database
    db = client.get_database('sample_mflix')
    collection = db.get_collection('movies')
    regex_query = {"title": {"$regex": q, "$options": "i"}}
    documents = collection.find(regex_query)
    
    ser_doc = [serialize_document(doc) for doc in documents]

    print("test start")
    for item in ser_doc:
        print(item)
    print("test end")
    return ResponseModel(status="success", data=ser_doc, message="Fetched Successfully")
