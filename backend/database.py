from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

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

#funcion para crear la sesion
if __name__ == "__main__":
    Base.metadata.create_all(engine)
    print("db iniciada")