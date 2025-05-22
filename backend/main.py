from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models

# Crear todas las tablas en la base de datos si no existen
models.Base.metadata.create_all(bind=engine)

# Inicializar la aplicación FastAPI
app = FastAPI()

# Dependencia para obtener la sesión de la base de datos en cada request
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Endpoint de prueba para ver si el servidor funciona
@app.get("/ping")
def ping():
    return {"message": "pong"}

# Endpoint para listar todas las maquinarias (aunque estén vacías)
@app.get("/maquinarias")
def listar_maquinarias(db: Session = Depends(get_db)):
    # Consulta la tabla base "maquinarias"
    return db.query(models.Maquinaria).all()

@app.get("/")
def read_root():
    return {"message": "API funcionando correctamente"}

