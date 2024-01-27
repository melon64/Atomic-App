from pymongo import MongoClient 
from mongoengine import DoesNotExist
from flask import Blueprint, Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
import datetime
import hashlib
import urllib
from .models.model import Goals, User, Comment, Task
from .settings import Settings
from google.cloud import storage
import os
from werkzeug.exceptions import BadRequest
from datetime import time, datetime, timedelta

schedule_routes = Blueprint('schedule_routes', __name__)

settings = Settings()
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = settings.GOOGLE_APPLICATION_CREDENTIALS

task_template = {
    "task_name": "test",
    "start_time": time(hour=0).isoformat(),
    "end_time": time(hour=23).isoformat(),
    "day": 0, #1 = Monday, 2 = Tuesday, etc.
}

storage_client = storage.Client()
bucket = storage_client.bucket(settings.db_name)

@schedule_routes.route('/user/schedule', methods=['POST'])
@jwt_required()
def create_schedule():
    user_id = get_jwt_identity()
    try:
        user = User.objects.get(username=user_id)
    except DoesNotExist:
        return {'message': 'User not found'}, 404

    task_data = request.get_json()
    new_task = Task(
        task_name=task_data.get('task_name'),
        start_time=task_data.get('start_time'),
        end_time=task_data.get('end_time'),
        day=int(task_data.get('day'))
    )

    try:
        new_task.validate()
    except ValidationError as e:
        return {'message': str(e)}, 400

    user.update(push__schedule=new_task)
    return {'message': 'Task added to schedule'}, 200  

@schedule_routes.route('/user/schedule', methods=['GET'])
@jwt_required()
def get_schedule():
    user_id = get_jwt_identity()
    try:
        user = User.objects.get(username=user_id)
    except DoesNotExist:
        return {'message': 'User not found'}, 404
    
    schedule = [task.to_mongo() for task in user.schedule]    
    return jsonify(schedule), 200

#delete task from schedule based on task name
@schedule_routes.route('/user/schedule/<task_id>', methods=['DELETE'])
@jwt_required()
def delete_task(task_id):
    user_id = get_jwt_identity()
    try:
        user = User.objects.get(username=user_id)
    except DoesNotExist:
        return {'message': 'User not found'}, 404

    for task in user.schedule:
        if task.task_name == task_id:
            user.update(pull__schedule=task)
            return {'message': 'Task deleted'}, 200
        
    return {'message': 'Task not found'}, 404
