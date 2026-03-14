from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, engine
from .routers import employee, attendance

Base.metadata.create_all(bind=engine)

app = FastAPI(title="HRMS Lite API")

origins = [
    "http://localhost:5173"
]

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(employee.router)
app.include_router(attendance.router)


@app.get("/")
def root():
    return {"message": "HRMS Lite API running"}