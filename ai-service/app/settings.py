from pydantic_settings import BaseSettings


class Setting(BaseSettings):
    #DB_URL: str = "postgresql+psycopg://ai:ai@localhost:5532/ai"
    OLLAMA_HOST: str = "http://192.168.31.246:11434/"


settings = Setting()
