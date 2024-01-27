from mongoengine import Document, StringField, EmailField, ListField, ReferenceField, DateTimeField, IntField, DictField
import datetime

class User(Document):
    username = StringField(required=True, unique=True)
    email = EmailField(required=True)
    password_hash = StringField(required=True)


class Habit(Document):
    user = ReferenceField(User, required=True)
    name = StringField(required=True)
    description = StringField()
    creation_date = DateTimeField(default=datetime.datetime.now)
    frequency = StringField() 
    duration = IntField()


class AIModelData(Document):
    user = ReferenceField(User, required=True)
    goals = ListField(StringField())
    schedules = ListField(DictField())
    priorities = ListField(StringField())


class CalendarEvent(Document):
    user = ReferenceField(User, required=True)
    title = StringField(required=True)
    event_date = DateTimeField(required=True)
    reminders = ListField(DateTimeField())

class Proof(Document):
    user = ReferenceField(User, required=True)
    habit = ReferenceField(Habit)
    file_reference = StringField()  #Reference to the file location/URL
    timestamp = DateTimeField(default=datetime.datetime.now)
    validation_status = StringField() #Validated, Invalidated, Pending

    