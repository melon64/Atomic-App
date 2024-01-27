from pymongo import MongoClient
# from .settings import Settings
# from .models.model import User, Habit, AIModelData, CalendarEvent, Proof
# import ssl

class MongoDB:
    def __init__(self):
        # settings = Settings()
        self.client = MongoClient(settings.db_host)      

    def get_client():
        return self.client

client = MongoClient("mongodb+srv://fkxie:GMYmnp9Koe5o3iaO@atomicdb.gjezih8.mongodb.net/?retryWrites=true&w=majority", tls=True, tlsAllowInvalidCertificates=True)
#test if cleint is connected
client.list_database_names()

