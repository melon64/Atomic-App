from flask import Blueprint, request, jsonify
from .models.model import User, Habit, AIModelData, CalendarEvent, Proof

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return "Hello World!"


