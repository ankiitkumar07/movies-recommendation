
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://eagleeyeofrajbika:KXylefF41dTTW2GU@cluster0.atxmg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

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