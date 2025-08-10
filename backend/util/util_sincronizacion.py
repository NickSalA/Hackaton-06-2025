from backend.util.util_env import require as key
import backend.util.util_excel as excel_util

from langchain.text_splitter import CharacterTextSplitter
from langchain.schema import Document
from azure.core.credentials import AzureKeyCredential
from azure.search.documents import SearchClient
from azure.ai.formrecognizer import DocumentAnalysisClient

# Librería para controlar la ejecución del código
import time

# Librería para generar identificadores únicos
import uuid
# Librería para manipular el sistema operativa
import os

# Librería con utilitarios para procesar archivos
import shutil

# Función para obtener los archivos de una ruta
def obtenerArchivos(ruta=None):
    # Listamos el contenido de la carpeta
    os.listdir(ruta)

    # Acumulamos los archivos encontrados
    listaDeArchivos = []
    for elemento in os.listdir(ruta):
        rutaCompleta = os.path.join(ruta, elemento)  # type: ignore

        # Solo añadimos si es archivo (no directorio)
        if os.path.isfile(rutaCompleta):
            listaDeArchivos.append(rutaCompleta)

    return listaDeArchivos


# Extrae el contenido de un archivo
def leerContenidoDeDocumento(rutaArchivo):

    # Nos conectamos al servicio
    servicio = DocumentAnalysisClient(
        key("CONF_AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT"),
        AzureKeyCredential(key("CONF_AZURE_DOCUMENT_INTELLIGENCE_KEY")),
    )

    # Abrimos el documento que queremos analizar
    with open(rutaArchivo, "rb") as archivo:

        # Damos la instruccion de lectura
        instruccion = servicio.begin_analyze_document("prebuilt-read", archivo)

        # Ejecutamos la instruccion para leer
        resultado = instruccion.result()

    # Acumulador del contenido del archivo
    contenido = ""

    # Iteramos cada página leida
    for pagina in resultado.pages:

        # Iteramos cada linea para cada página
        for linea in pagina.lines:

            # Acumulamos el contenido
            contenido = contenido + linea.content + "\n"

    return contenido


# Obtiene los chunks desde un texto leído
def obtenerChunks(contenido: str = "", leccion: str = ""):
    documento: list[Document] = [Document(page_content=contenido)]
    cortadorDeTexto = CharacterTextSplitter(
        separator="\n",
        chunk_size=1000,
        chunk_overlap=100,
    )

    chunks = cortadorDeTexto.split_documents(documento)
    chunksConIdentificadores = []

    for chunk in chunks:
        estructuraDeChunk = {
            "id": str(uuid.uuid4()),
            "content": chunk.page_content,
            "leccion": leccion  # se añade la lección
        }
        chunksConIdentificadores.append(estructuraDeChunk)
    return chunksConIdentificadores


# Carga un archivo en una base de conocimiento
def cargarArchivo(rutaDeArchivo: str, nombreDeBaseDeConocimiento: str):
    contenido = leerContenidoDeDocumento(rutaDeArchivo)

    # Extraer lección del nombre de la carpeta contenedora
    # p.ej. /data/leccion1/archivo.pdf → leccion = "leccion1"
    nombre_archivo = os.path.basename(rutaDeArchivo)
    leccion = nombre_archivo.split("_")[0]

    chunks = obtenerChunks(contenido, leccion=leccion)

    baseDeConocimiento = SearchClient(
        f"https://{key('CONF_AZURE_SEARCH_SERVICE_NAME')}.search.windows.net",
        nombreDeBaseDeConocimiento,
        AzureKeyCredential(key('CONF_AZURE_SEARCH_KEY')),
    )
    resultadosDeInserciones = baseDeConocimiento.upload_documents(chunks)
    return resultadosDeInserciones


# Sincroniza los documentos de una ruta a una base de conocimiento
def sincronizarBaseDeConocimiento(
    carpeta=None, nombreDeBaseDeConocimiento:str="", tiempoDeEspera: int = 5
):
    archivos_procesados = set()  # Guardamos nombres de archivos ya procesados

    while True:
        print("Ejecutando sincronización...")

        listaDeArchivos = obtenerArchivos(ruta=carpeta)

        if len(listaDeArchivos) >= 1:
            for archivo in listaDeArchivos:
                nombre_archivo = os.path.basename(archivo)

                # Saltamos si ya fue procesado
                if nombre_archivo in archivos_procesados:
                    continue

                print(f"Cargando archivo: {archivo}")

                try:
                    if excel_util.esArchivoExcel(archivo):
                        print("Archivo Excel detectado.")
                        resultados = excel_util.cargarArchivoExcel(
                            rutaDeArchivo=archivo,
                            nombreDeBaseDeConocimiento=nombreDeBaseDeConocimiento,
                        )
                        archivos_procesados.add(nombre_archivo)
                        os.remove(archivo)
                        print("Archivo Excel procesado y eliminado correctamente.")
                        continue

                    # Si no es Excel, sigue el flujo normal
                    resultadosDeInserciones = cargarArchivo(
                        rutaDeArchivo=archivo,
                        nombreDeBaseDeConocimiento=nombreDeBaseDeConocimiento,
                    )
                    os.remove(archivo)
                    print("Archivo procesado y eliminado correctamente.")

                except Exception as e:
                    print(f"Ocurrió un error al sincronizar: {e}")
                    if carpeta:
                        carpetaDeErrores: str = os.path.join(
                            carpeta, "errores/", str(uuid.uuid4()) + "/"
                        )
                    print(f"Moviendo archivo a carpeta de errores: {carpetaDeErrores}")
                    os.makedirs(carpetaDeErrores, exist_ok=True)
                    shutil.move(archivo, carpetaDeErrores)

        time.sleep(tiempoDeEspera)
