#librerias
from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, Text, JSON, DateTime
from sqlalchemy.orm import relationship
from database import Base


#tabla base maquinarias
class Maquinaria(Base):
    __tablename__ = "maquinarias"
    
    #campos comunes para todas las maquinarias
    id = Column(Integer, primary_key=True, index=True)
    tipo = Column(String, index=True)  #si es elevador o grua etc
    modelo = Column(String, nullable=False)
    marca = Column(String, nullable=False)
    anio_fabricacion = Column(Integer, nullable=True)
    descripcion = Column(Text)
    ficha_tecnica_path = Column(String)  #ruta a la ficha tecnica

    #relaciones
    imagenes = relationship("Imagen", back_populates="maquinaria", cascade="all, delete-orphan")
    
    #herencia
    __mapper_args__ = {
        "polymorphic_on": tipo,
        "polymorphic_identity": "maquinaria"
    }

#tabla elevadores
class Elevador(Maquinaria):
    __tablename__ = "elevadores"
    
    #PK que es tambien FK a la tabla base
    id = Column(Integer, ForeignKey("maquinarias.id"), primary_key=True)
    
    #ejemplos de campos (dsp rellenamos bien dependiendo de los pdfs de las maquinas)
    altura_maxima = Column(Float, nullable=False)  #en metros
    capacidad_carga = Column(Float, nullable=False)  #en kg
    tipo_motor = Column(String)  
    ancho_plataforma = Column(Float)  #en metros
    largo_plataforma = Column(Float)  #en metros
    
    #herencia
    __mapper_args__ = {
        "polymorphic_identity": "elevador",
    }

#plataformas
class Plataforma(Maquinaria):
    __tablename__ = "plataformas"
    
    #PK que es tambien FK a la tabla bas
    id = Column(Integer, ForeignKey("maquinarias.id"), primary_key=True)
    
    #ejemplos de campos (dsp rellenamos bien dependiendo de los pdfs de las maquinas)
    altura_trabajo = Column(Float, nullable=False)  #en metros
    altura_plataforma = Column(Float, nullable=True)
    alcance_horizontal = Column(Float)  #en metros
    capacidad_cesta = Column(Float, nullable=False)  #n kg
    ancho_maquina = Column(Float)  #en metros
    tipo_combustible = Column(String)  
    es_articulada = Column(Boolean, default=False) #true si es articulada, false si es telescopica (ejemplo de booleano por si nos sirve dsp)

    
    #herencia
    __mapper_args__ = {
        "polymorphic_identity": "plataforma",
    }

#camiones grua
class CamionGrua(Maquinaria):
    __tablename__ = "camiones_grua"
    
    #PK que es tambien FK a la tabla base
    id = Column(Integer, ForeignKey("maquinarias.id"), primary_key=True)
    
    #ejemplos de campos (dsp rellenamos bien dependiendo de los pdfs de las maquinas)
    capacidad_maxima = Column(Float, nullable=False)  #en toneladas
    alcance_maximo = Column(Float, nullable=False)  #en metros
    altura_maxima = Column(Float, nullable=False)  #en metros
    tipo_vehiculo = Column(String)  #tipo string por si hubieran varios tipos de camiones
    
    #herencia
    __mapper_args__ = {
        "polymorphic_identity": "camion_grua",
    }

#fotos
class Imagen(Base):
    __tablename__ = "imagenes"
    
    id = Column(Integer, primary_key=True, index=True)
    url = Column(String, nullable=False) #directorio de la imagen
    
    #relacion con maquinaria
    maquinaria_id = Column(Integer, ForeignKey("maquinarias.id"), nullable=False)
    maquinaria = relationship("Maquinaria", back_populates="imagenes")

