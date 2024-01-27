from flask import Flask, request, jsonify
from mongoengine import connect
from .settings import Settings
from .models.model import User
import urllib
import hashlib
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
import datetime
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    settings = Settings()

    CORS(app)

    app.config['MONGODB_SETTINGS'] = {
        'db': settings.db_name,
        'host': settings.db_host,
        'port': settings.db_port,
    }

    connect(**app.config['MONGODB_SETTINGS'])
    app.config['JWT_SECRET_KEY'] = settings.jwt_secret_key
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(days=1)
    jwt = JWTManager(app)

    from .routes import main as main_blueprint
    app.register_blueprint(main_blueprint)

    from .user_routes import user_routes as user_blueprint
    app.register_blueprint(user_blueprint)

    from .goal_routes import goal_routes as goal_blueprint
    app.register_blueprint(goal_blueprint)

    return app