from fastapi import FastAPI
from app.routers.agent import router as agent_router
# from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="DevCanvas AI")

# # CORS setup
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=settings.BACKEND_CORS_ORIGINS,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# Include routes
app.include_router(agent_router)


@app.get("/")
async def root():
    return {"message": "Hello Bigger Applications!"}
