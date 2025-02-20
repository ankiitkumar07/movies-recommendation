
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from app.config.config import settings


# Create a new client and connect to the server
class MongoDB:
    __uri = f"mongodb+srv://{settings.MONGO_INITDB_ROOT_USERNAME}:{settings.MONGO_INITDB_ROOT_PASSWORD}@{settings.MONGO_INITDB_DATABASE}.atxmg.mongodb.net/?retryWrites=true&w=majority&appName={settings.MONGO_INITDB_APP_NAME}"
    _instance = None

    def __new__(cls, uri=__uri, db_name="sample_mflix"):
        if cls._instance is None:
            cls._instance = super(MongoDB, cls).__new__(cls)
            cls._instance._connect(uri, db_name)
        return cls._instance

    def _connect(self, uri, db_name):
        """Initialize the MongoDB connection"""
        try:
            self.client = MongoClient(uri, server_api=ServerApi('1'))
            self.db = self.client[db_name]
            self.client.admin.command('ping')
            print("MongoDB connected")
        except Exception as e:
            print(f"MongoDB connection error: {e}")

    def get_collection(self, collection_name):
        """Returns a collection from the MongoDB database"""
        return self.db[collection_name]

    def insert_one(self, collection_name, document):
        """Inserts a single document into a collection"""
        collection = self.get_collection(collection_name)
        return collection.insert_one(document)

    def find(self, collection_name, query):
        """Find documents in a collection based on a query"""
        collection = self.get_collection(collection_name)
        return collection.find(query)

    def close(self):
        """Closes the MongoDB connection"""
        self.client.close()
        print("MongoDB connection closed")
