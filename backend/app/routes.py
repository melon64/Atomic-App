from flask import Blueprint, request, jsonify
from .models.model import User
from google.cloud import storage
from .settings import Settings
import os

main = Blueprint('main', __name__)

settings = Settings()
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = settings.GOOGLE_APPLICATION_CREDENTIALS

storage_client = storage.Client()
bucket = storage_client.bucket(settings.db_name)

@main.route('/')
def index():
    return "Hello World!"

@main.route('/upload', methods=['POST'])
def upload_image():
    file = request.files['file']
    blob = bucket.blob(file.filename)
    blob.upload_from_string(
        file.read(), 
        content_type=file.content_type
    )
    url = blob.public_url
    return {'url': url}, 200


