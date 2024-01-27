from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    db_name: str
    db_host: str
    db_port: int
    jwt_secret_key: str
    GOOGLE_APPLICATION_CREDENTIALS: str

    class Config:
        env_file = ".env"
