from pymongo import MongoClient 
from flask import Blueprint, Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
import datetime
import hashlib
import urllib
from .models.model import User, Goals, Task, Comment

user_routes = Blueprint('user_routes', __name__)

@user_routes.route('/user', methods=['POST'])
def create_user():
    new_user = request.get_json()
    new_user['password_hash'] = hashlib.sha256(new_user['password'].encode()).hexdigest()
    del new_user['password']
    if User.objects(username=new_user['username']):
        return jsonify({"message": "User already exists"}), 400
    else:
        user = User(**new_user).save()
        return jsonify(user.to_dict()), 200

@user_routes.route('/user/login', methods=['POST'])
def login_user():
    user = User.objects(username=request.get_json()['username']).first()
    if user:
        if user['password_hash'] == hashlib.sha256(request.get_json()['password'].encode()).hexdigest():
            access_token = create_access_token(identity=user['username'])
            return jsonify(access_token=access_token), 200
        else:
            return jsonify({"message": "Invalid password"}), 401
    else:
        return jsonify({"message": "User not found"}), 404

@user_routes.route('/user/logout', methods=['POST'])
@jwt_required()
def logout_user():
    return jsonify({"message": "User logged out"}), 200

@user_routes.route('/user', methods=['GET'])
@jwt_required()
#return user data except password_hash
def get_user():
    print("user", get_jwt_identity())
    try:
        user = User.objects(username=get_jwt_identity()).exclude('password_hash').first()
        if not user:
            return jsonify({"message": "User not found"}), 404
        return jsonify(user.to_dict()), 200
    except Exception as e:
        return jsonify({"message": "An error occurred: " + str(e)}), 500

@user_routes.route('/user', methods=['PUT'])
@jwt_required()
def update_user():
    user = User.objects(username=get_jwt_identity()).first()
    user.update(**request.get_json())
    return jsonify(user.to_dict()), 200

@user_routes.route('/user', methods=['DELETE'])
@jwt_required()
def delete_user():
    user = User.objects(username=get_jwt_identity()).first()
    user.delete()
    return jsonify({"message": "User deleted"}), 200

@user_routes.route('/user/validate', methods=['POST'])
@jwt_required()
def validate_user():
    return jsonify({"message": "User token is valid"}), 200

@user_routes.route('/user/goals', methods=['GET'])
@jwt_required()
def get_goals():
    user = User.objects(username=get_jwt_identity()).first()
    goals = user.goals
    goal_array = []
    for goal in goals:
        goal_dict = {}
        goal_dict['goal_name'] = goal.goal_name
        goal_dict['goal_tasks'] = [task.to_mongo().to_dict() for task in goal.tasks]
        goal_array.append(goal_dict)
    return jsonify(goal_array), 200

#get all the tasks of the user from their goals, return as a list of tasks
@user_routes.route('/user/tasks', methods=['GET'])
@jwt_required()
def get_tasks():
    user = User.objects(username=get_jwt_identity()).first()
    goals = user.goals
    task_array = []
    for goal in goals:
        for task in goal.tasks:
            task_array.append(task.to_mongo().to_dict())
    return jsonify(task_array), 200
