from flask import Flask
from mongoengine import connect
from .settings import Settings
from .mongodb import MongoDB
from .models.model import User, Habit, AIModelData, CalendarEvent, Proof


def create_app():
    app = Flask(__name__)
    settings = Settings()

    app.config['MONGODB_SETTINGS'] = {
        'db': settings.db_name,
        'host': settings.db_host,
        'port': settings.db_port
    }

    connect(**app.config['MONGODB_SETTINGS'])

    from .routes import main as main_blueprint
    app.register_blueprint(main_blueprint)

    from .user_routes import user_routes as user_blueprint
    app.register_blueprint(user_blueprint)

    return app