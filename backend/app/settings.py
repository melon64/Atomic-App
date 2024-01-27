from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    db_name: str
    db_host: str
    db_port: int
    jwt_secret_key: str
    gcp_key: str

    class Config:
        env_file = ".env"
