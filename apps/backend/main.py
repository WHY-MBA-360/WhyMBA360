from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.leads import router as leads_router
from app.db import init_db

app = FastAPI(title="MBA360 Backend")

# Allow all origins for development — tighten in production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()

app.include_router(leads_router, prefix="/leads", tags=["leads"])

@app.get("/health", tags=["health"])
def health():
    return {"status": "ok"}
