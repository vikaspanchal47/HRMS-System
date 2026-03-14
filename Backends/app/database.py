from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = "postgresql://hrm_system_oi05_user:JZMc8Gt2BXTL2088mYwWH2UdG56s4dd8@dpg-d6n5m7bh46gs73c2uc0g-a.oregon-postgres.render.com/hrm_system_oi05"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()