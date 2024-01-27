from pymongo import MongoClient
from .settings import Settings
from .models.model import User, Habit, AIModelData, CalendarEvent, Proof

class MongoDB:
    def __init__(self):
        settings = Settings()
        self.client = MongoClient(settings.db_host)
        self.db = self.client[settings.db_name]

    def insert_one(self, collection, document):
        return self.db[collection].insert_one(document)

    def find(self, collection, query):
        return self.db[collection].find(query)