from mongoengine import Document, StringField, EmailField, ListField, ReferenceField, DateTimeField, IntField, DictField
import datetime

class User(Document):
    username = StringField(required=True, unique=True)
    password_hash = StringField(required=True)
    priorities = ListField(StringField())
    goals = ListField(StringField()) 
    schedule = ListField(DictField())

    def to_dict(self):
        return {
            'username': str(self.username),
            'priorities': list(self.priorities),
            'goals': list(self.goals),
            'schedule': list(self.schedule)
        }

class Goals(Document):
    user = ReferenceField(User, required=True)
    goal_id = StringField(required=True)
    goal_name = StringField(required=True)
    goal_description = StringField()
    goal_creation_date = DateTimeField(default=datetime.datetime.now)
    goal_start_date = DateTimeField()
    goal_end_date = DateTimeField()
    goal_status = StringField() #Active, Completed, Failed
    goal_priority = StringField() #High, Medium, Low
    


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

    