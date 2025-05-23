from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
import models
import os
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.mount("/img", StaticFiles(directory="img"), name="img")
app.mount("/fichas_tecnicas", StaticFiles(directory="fichas_tecnicas"), name="fichas_tecnicas")

# Configuración de CORS
origins = [
    "http://localhost:5173/productos"  #Frontend (Vite o React)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Permitir estos orígenes
    allow_credentials=True,
    allow_methods=["*"],    # Permitir todos los métodos (GET, POST, etc.)
    allow_headers=["*"],    # Permitir todas las cabeceras
)



def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/maquinarias")
def get_maquinarias(db: Session = Depends(get_db)):
    return db.query(models.Maquinaria).all()
@app.get("/ficha_tecnica/{maquinaria_id}")
def get_ficha_tecnica(maquinaria_id: int):
    db = SessionLocal()
    maquinaria = db.query(models.Maquinaria).filter(models.Maquinaria.id == maquinaria_id).first()
    db.close()
    if not maquinaria or not getattr(maquinaria, "ficha_tecnica_path", None):
        raise HTTPException(status_code=404, detail="Ficha técnica no encontrada")
    ficha_path = getattr(maquinaria, "ficha_tecnica_path", None)
    if not ficha_path or not os.path.isfile(ficha_path):
        raise HTTPException(status_code=404, detail="Archivo PDF no encontrado")
    # Devuelve un mensaje de texto simple en vez de descargar el PDF
    return {"mensaje": f"Ficha técnica encontrada: {os.path.basename(ficha_path)}"}
@app.get("/imagenes/{maquinaria_id}")
def get_imagenes(maquinaria_id: int):
    db = SessionLocal()
    imagenes = db.query(models.Imagen).filter(models.Imagen.maquinaria_id == maquinaria_id).all()
    db.close()
    if not imagenes:
        raise HTTPException(status_code=404, detail="No hay imágenes para esta maquinaria")
    # Devuelve la lista de URLs de las imágenes asociadas
    return {"imagenes": [img.url for img in imagenes]}

#para probar http://127.0.0.1:8000/ficha_tecnica/3 o la que sea