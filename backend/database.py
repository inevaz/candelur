
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

#url de la db
DATABASE_URL = "sqlite:///./productos.db"

#creacion de motor 
engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)

#creacion de la sesion
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

#base para los modelos
Base = declarative_base()
