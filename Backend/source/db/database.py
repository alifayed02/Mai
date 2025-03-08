import certifi
from pymongo import MongoClient

class MongoDatabase:

    connection_string = None
    client = None

    def __init__(self, connection_string):
        self.connection_string = connection_string
        self.client = MongoClient(connection_string, tlsCAFile=certifi.where())

    def get_thread_collection(self):
        db = self.client["Guidance"]
        return db["Threads"]