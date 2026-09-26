from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.ai_routes import router as ai_router
from app.routes.upload_routes import router as upload_router
from app.routes.auth_routes import router as auth_router

from app.database import engine, Base
from app import models
from app.routes.history_routes import router as history_router
Base.metadata.create_all(bind=engine)

app = FastAPI(title="DevMate AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ai_router, prefix="/api/ai")
app.include_router(upload_router, prefix="/api/upload")
app.include_router(auth_router, prefix="/api/auth")
app.include_router(history_router, prefix="/api/history")

@app.get("/")
def home():
    return {"message": "DevMate AI Backend Running"}