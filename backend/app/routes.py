from flask import Blueprint, request, jsonify
from .mongodb import MongoDB
from .models.model import User, Habit, AIModelData, CalendarEvent, Proof

main = Blueprint('main', __name__)
db = MongoDB()
