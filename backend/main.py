from fastapi import FastAPI, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from database import SessionLocal
import models
import os
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
import smtplib
from email.mime.text import MIMEText
from textwrap import dedent

app = FastAPI()

# Configuración de CORS
origins = [
    "http://localhost:5173",  # útil para desarrollo local (podés dejarlo)
    "https://candelur.com.uy",  # dominio de producción
    "https://www.candelur.com.uy",  # por si usan la versión con www
]

app.mount("/img", StaticFiles(directory="img"), name="img")
app.mount("/fichas_tecnicas", StaticFiles(directory="fichas_tecnicas"), name="fichas_tecnicas")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Permitir estos orígenes
    allow_credentials=True,
    allow_methods=["*"],    # Permitir todos los métodos (GET, POST, etc.)
    allow_headers=["*"],    # Permitir todas las cabeceras
)

@app.post("/contact")
async def send_contact_form(request: Request):
    form_data = await request.json()
    print("Datos recibidos:", form_data)

    sender_email = form_data.get("email", "no-reply@example.com")
    receiver_email = "info@candelur.com.uy"

    # Crear el cuerpo del mensaje
    msg = MIMEText(f"""
        Nombre: {form_data.get('firstName', '')} {form_data.get('lastName', '')}
        Email: {form_data.get('email', '')}
        Teléfono: {form_data.get('contactNumber', '')}
        Mensaje:
        {form_data.get('message', '')}
    """)
    msg["Subject"] = "Nuevo contacto desde el sitio web"
    msg["From"] = sender_email
    msg["To"] = receiver_email

    try:
        # Enviar a un servidor SMTP local de prueba (no necesita login)
        with smtplib.SMTP("localhost", 1025) as server:
            server.sendmail(sender_email, receiver_email, msg.as_string())
        return JSONResponse({"success": True, "message": "Correo simulado enviado correctamente"})
    except Exception as e:
        print("Error al enviar correo:", str(e))
        return JSONResponse({"success": False, "message": f"Error: {str(e)}"}, status_code=500)
    
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
