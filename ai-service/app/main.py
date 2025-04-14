from fastapi import FastAPI
from app.routers.agent import router as agent_router

app = FastAPI()

app.include_router(agent_router)

@app.get("/")
async def root():
    return {"message": "Hello Bigger Applications!"}