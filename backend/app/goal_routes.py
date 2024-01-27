from pymongo import MongoClient 
from mongoengine import DoesNotExist
from flask import Blueprint, Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
import datetime
import hashlib
import urllib
from .models.model import Goals, User, Comment
from .settings import Settings
from google.cloud import storage
import os
from werkzeug.exceptions import BadRequest


goal_routes = Blueprint('goal_routes', __name__)

settings = Settings()
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = settings.GOOGLE_APPLICATION_CREDENTIALS


storage_client = storage.Client()
bucket = storage_client.bucket(settings.db_name)

@goal_routes.route('/goal', methods=['POST'])
@jwt_required()
def create_goal():
    user_id = get_jwt_identity()
    try:
        user = User.objects.get(username=user_id)
    except DoesNotExist:
        return {'message': 'User not found'}, 404

    new_goal = {
        'user': user,
        'goal_name': request.form.get('goal_name'),
        'goal_description': request.form.get('goal_description'),
        'goal_start_date': request.form.get('goal_start_date'),
        'goal_status': request.form.get('goal_status'),
        'goal_priority': request.form.get('goal_priority'),
        'isPrivate': request.form.get('isPrivate'),
    }

    file = request.files.get('image')
    if file:
        blob = bucket.blob(file.filename)
        blob.upload_from_string(
            file.read(), 
            content_type=file.content_type
        )
        url = blob.public_url
        new_goal['image_url'] = url
    else:
        new_goal['image_url'] = None

    try:
        goal = Goals(**new_goal).save()
        user.update(push__goals=goal)
        return jsonify(goal.to_dict()), 200
    except BadRequest:
        return {'message': 'Invalid data'}, 400

@goal_routes.route('/goal', methods=['GET'])
@jwt_required()
def get_goals():
    user_id = get_jwt_identity()
    try:
        user = User.objects.get(username=user_id)
    except DoesNotExist:
        return {'message': 'User not found'}, 404

    goals = Goals.objects(user=user)
    return jsonify([goal.to_dict() for goal in goals]), 200

@goal_routes.route('/goal/<id>', methods=['GET'])
@jwt_required()
def get_goal(id):
    user_id = get_jwt_identity()
    try:
        user = User.objects.get(username=user_id)
    except DoesNotExist:
        return {'message': 'User not found'}, 404

    try:
        goal = Goals.objects.get(id=id)
    except DoesNotExist:
        return {'message': 'Goal not found'}, 404

    if goal.user.id != user.id and goal.isPrivate == 'True':
        return {'message': 'Unauthorized'}, 401

    return jsonify(goal.to_dict()), 200

@goal_routes.route('/goal/<id>/comment', methods=['POST'])
@jwt_required()
def add_comment(id):
    user_id = get_jwt_identity()
    try:
        user = User.objects.get(username=user_id)
    except DoesNotExist:
        return {'message': 'User not found'}, 404

    try:
        goal = Goals.objects.get(id=id)
    except DoesNotExist:
        return {'message': 'Goal not found'}, 404

    new_comment = {
        'user': user,
        'goal': goal,
        'text': request.form.get('text')
    }

    file = request.files.get('image')
    if file:
        blob = bucket.blob(file.filename)
        blob.upload_from_string(
            file.read(), 
            content_type=file.content_type
        )
        url = blob.public_url
        new_comment['image_url'] = url
    else:
        new_comment['image_url'] = None

    try:
        comment = Comment(**new_comment).save()
        goal.update(push__comments=comment)
        return jsonify(comment.to_dict()), 200
    except BadRequest:
        return {'message': 'Invalid data'}, 400

@goal_routes.route('/goal/<id>/comment', methods=['GET'])
@jwt_required()
def get_comments(id):
    user_id = get_jwt_identity()
    try:
        user = User.objects.get(username=user_id)
    except DoesNotExist:
        return {'message': 'User not found'}, 404

    try:
        goal = Goals.objects.get(id=id)
    except DoesNotExist:
        return {'message': 'Goal not found'}, 404

    comments = Comment.objects(goal=goal)
    return jsonify([comment.to_dict() for comment in comments]), 200

