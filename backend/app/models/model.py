from mongoengine import Document, StringField, EmailField, ListField, ReferenceField, DateTimeField, IntField, DictField, EmbeddedDocumentField, EmbeddedDocument
from datetime import time, datetime
import datetime

class Task(EmbeddedDocument):
    goal = ReferenceField('Goals')
    task_name = StringField(required=True)
    start_time = StringField(default=time(hour=0).isoformat())
    end_time = StringField(default=time(hour=23).isoformat())
    day = IntField(min_value=0, max_value=6, required=True)  # 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    def to_dict(self):
        return {
            'goal': str(self.goal.id),
            'task_name': str(self.task_name),
            'start_time': str(self.start_time),
            'end_time': str(self.end_time),
            'day': int(self.day)
        }

    def to_dict(self):
        return {
            'goal': str(self.goal.id),
            'task_name': str(self.task_name),
            'start_time': str(self.start_time),
            'end_time': str(self.end_time),
            'day': int(self.day)
        }
        
class User(Document):
    username = StringField(required=True, unique=True)
    password_hash = StringField(required=True)
    priorities = ListField(StringField())
    goals = ListField(ReferenceField('Goals'))
    schedule = ListField(EmbeddedDocumentField(Task))

    def to_dict(self):
        return {
            'username': str(self.username),
            'priorities': list(self.priorities),
            'goals': [str(goal.id) for goal in self.goals],
            'schedule': [task.to_mongo().to_dict() for task in self.schedule],
        }

class Goals(Document):
    user = ReferenceField(User, required=True)
    goal_name = StringField(required=True)
    goal_description = StringField()
    goal_creation_date = DateTimeField(default=datetime.datetime.now)
    image_url = StringField()
    goal_start_date = DateTimeField()
    goal_duration = IntField() #in days
    goal_status = StringField() #Active, Completed, Failed
    goal_priority = StringField() #High, Medium, Low
    isPrivate = StringField() #True, False
    comments = ListField(ReferenceField('Comment'))
    tasks = ListField(EmbeddedDocumentField(Task))

    def to_dict(self):
        return {
            'id': str(self.id),
            'user': str(self.user.id),
            'goal_name': str(self.goal_name),
            'goal_description': str(self.goal_description),
            'goal_creation_date': str(self.goal_creation_date),
            'image_url': str(self.image_url),
            'goal_start_date': str(self.goal_start_date),
            'goal_duration': str(self.goal_duration),
            'goal_status': str(self.goal_status),
            'goal_priority': str(self.goal_priority),
            'isPrivate': str(self.isPrivate),
            'comments': [str(comment.id) for comment in self.comments],
            'tasks': [task.to_mongo().to_dict() for task in self.tasks]
        }

class Comment(Document):
    goal = ReferenceField('Goals', required=True)
    user = ReferenceField('User', required=True)
    text = StringField(required=True)
    image_url = StringField()
    creation_date = DateTimeField(default=datetime.datetime.now)

    def to_dict(self):
        return {
            'goal': str(self.goal.id),
            'user': str(self.user.id),
            'text': str(self.text),
            'image_url': str(self.image_url),
            'creation_date': str(self.creation_date)
        }


    