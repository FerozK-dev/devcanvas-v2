from fastapi import FastAPI, Request, Response
from app.routers.agent import router as agent_router
from fastapi.middleware.cors import CORSMiddleware
from prometheus_client import Histogram, generate_latest, CONTENT_TYPE_LATEST
import time

app = FastAPI(title="DevCanvas AI")

# Prometheus metrics setup
REQUEST_DURATION = Histogram(
    'http_request_duration_seconds',
    'Duration of HTTP requests in seconds',
    ['method', 'endpoint', 'status_code']
)

@app.middleware("http")
async def prometheus_metrics(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    duration = time.time() - start_time

    REQUEST_DURATION.labels(
        method=request.method,
        endpoint=request.url.path,
        status_code=response.status_code
    ).observe(duration)

    return response

# Metrics endpoint
@app.get("/metrics")
def metrics():
    return Response(generate_latest(), media_type=CONTENT_TYPE_LATEST)

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001", "https://app.devcanvas.live", "https://frontend.localhost"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include your routers
app.include_router(agent_router)

@app.get("/")
async def root():
    return {"message": "Hello Bigger Applications!"}
