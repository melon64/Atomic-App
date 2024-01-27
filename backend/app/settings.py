from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    db_name: str
    db_host: str
    db_port: int
    cohere_api_key: str

    class Config:
        env_file = ".env"
