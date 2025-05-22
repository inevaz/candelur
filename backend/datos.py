from sqlalchemy.orm import Session
from database import SessionLocal
import models
from models import Base
from database import engine

#creacion de la base de datos
Base.metadata.create_all(engine)
print("Tablas creadas")

#funcion principal para meter datos a la db
def insertardatos_db():
    db: Session = SessionLocal()  #sesion nueva 

    #lista de maquinas con los datos basicos
    productos = [
        {"modelo": "JLG 20AM", "tipo": "plataforma", "altura": 8.22, "carga": 160},
        {"modelo": "Genie IWP24", "tipo": "plataforma", "altura": 9.10, "carga": 159},
        {"modelo": "Genie AWP36 DC", "tipo": "plataforma", "altura": 11.1, "carga": 159},
        {"modelo": "JLG 41AM", "tipo": "plataforma", "altura": 12.5, "carga": 135},
        {"modelo": "Manitou 200 ATL", "tipo": "plataforma", "altura": 18.28, "carga": 230},
        {"modelo": "JLG E450AJ", "tipo": "plataforma", "altura": 13.72, "carga": 230},
        {"modelo": "JLG N40E", "tipo": "plataforma", "altura": 12.19, "carga": 227},
        {"modelo": "JLG 600S", "tipo": "plataforma", "altura": 18.29, "carga": 272},
        {"modelo": "Genie Z-30", "tipo": "plataforma", "altura": 9.14, "carga": 227},
        {"modelo": "Manitou MI25D", "tipo": "elevador", "altura": 5.0, "carga": 2500},
        {"modelo": "MKG HLK205", "tipo": "camion_grua", "altura": 20.0, "carga": None},
    ]    #modelos y sus respectivas fichas 
    fichas = {
        "JLG 20AM": "JLG-20am.pdf",
        "JLG 41AM": "JLG-41am.pdf",
        "JLG 600S": "JLG-600s.pdf",
        "JLG E450AJ": "JLG-e450aj.pdf",
        "JLG N40E": "JLG-n40e.pdf",
        "Genie IWP24": "GENIE-IWP24.pdf",
        "Genie AWP36 DC": "GENIE-awp20-25-30-36-40.pdf",  
        "Genie Z-30": "GENIE-z30.pdf",
        "Manitou 200 ATL": "Manitou-200atj.pdf",
        "Manitou MI25D": "Manitou-mi25d.pdf",
        "MKG HLK205": "MKG-HLK205.pdf",
    }
    #mismo nombre imagen que pdf pero en png
    #recorre la lista de productos y los inserta en db
    for p in productos:
        ficha_pdf = fichas.get(p["modelo"], f"{p['modelo'].lower().replace(' ', '_').replace('-', '_')}.pdf")
        imagen_png = ficha_pdf.replace('.pdf', '.png')

        if p["tipo"] == "plataforma":
            maquinaria = models.Plataforma(
                tipo=p["tipo"],
                modelo=p["modelo"],
                marca=p["modelo"].split()[0],
                descripcion="",
                ficha_tecnica_path=f"fichas_tecnicas/{ficha_pdf}",
                altura_trabajo=p["altura"],
                capacidad_cesta=p["carga"]
            )
        elif p["tipo"] == "elevador":
            maquinaria = models.Elevador(
                tipo=p["tipo"],
                modelo=p["modelo"],
                marca=p["modelo"].split()[0],
                descripcion="",
                ficha_tecnica_path=f"fichas_tecnicas/{ficha_pdf}",
                altura_maxima=p["altura"],
                capacidad_carga=p["carga"]
            )
        elif p["tipo"] == "camion_grua":
            maquinaria = models.CamionGrua(
                tipo=p["tipo"],
                modelo=p["modelo"],
                marca=p["modelo"].split()[0],
                descripcion="",
                ficha_tecnica_path=f"fichas_tecnicas/{ficha_pdf}",
                altura_maxima=p["altura"],
                capacidad_maxima=0.0,  
                alcance_maximo=0.0
            )
        db.add(maquinaria)
        db.commit()
        db.refresh(maquinaria)

        imagen = models.Imagen(
            url=f"img/{imagen_png}", #ruta de la imagen
            maquinaria_id=maquinaria.id
        )
        db.add(imagen)
        db.commit()

    db.close()  #cierra la sesion

#ejecuta funcion
if __name__ == "__main__":
    insertardatos_db()
