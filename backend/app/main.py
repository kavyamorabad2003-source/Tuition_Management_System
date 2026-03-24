from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import models, schemas, config
from .database import engine, get_db

models.User.metadata.create_all(bind=engine)

app = FastAPI(title="Tuition Management System API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Tuition Management System API"}

@app.get("/health")
def health_check():
    return {"status": "ok"}
