
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from app.config.config import settings

uri = f"mongodb+srv://{settings.MONGO_INITDB_ROOT_USERNAME}:{settings.MONGO_INITDB_ROOT_PASSWORD}@{settings.MONGO_INITDB_DATABASE}.atxmg.mongodb.net/?retryWrites=true&w=majority&appName={settings.MONGO_INITDB_APP_NAME}"

# Create a new client and connect to the server


def connect_to_mongo():
    client = MongoClient(uri, server_api=ServerApi('1'))

    # Send a ping to confirm a successful connection
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
        return client
    except Exception as e:
        print(e)
