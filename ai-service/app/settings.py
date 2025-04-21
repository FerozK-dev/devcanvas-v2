from pydantic_settings import BaseSettings


class Setting(BaseSettings):
    DATABASE_URL: str
    JWT_SECRET: str
    ALGORITHM: str = "HS256"


settings = Setting()
