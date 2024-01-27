from flask import Blueprint, request, jsonify
from .models.model import User, Habit, AIModelData, CalendarEvent, Proof
from google.cloud import storage
from .settings 

main = Blueprint('main', __name__)

storage_client = storage.Client()
bucket = storage_client.bucket()

@main.route('/')
def index():
    return "Hello World!"

@app.route('/upload', methods=['POST'])
def upload_image():
    file = request.files['file']
    blob = bucket.blob(file.filename)
    blob.upload_from_string(
        file.read(), 
        content_type=file.content_type
    )
    url = blob.public_url
    return {'url': url}, 200


