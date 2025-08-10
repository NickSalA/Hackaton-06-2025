# util_sincronizacion.py
from typing import Iterable, Dict, Any
import os, time, uuid, pathlib, json

from azure.search.documents import SearchClient
from azure.core.credentials import AzureKeyCredential
from openai import AzureOpenAI

from src.util.util_env import require as key

def _get_search_client(index_name: str) -> SearchClient:
    endpoint = key("CONF_AZURE_SEARCH_ENDPOINT")
    api_key  = key("CONF_AZURE_SEARCH_ADMIN_KEY")  # o QUERY_KEY si es lo que usas
    return SearchClient(endpoint=endpoint,
                        index_name=index_name,
                        credential=AzureKeyCredential(api_key))

def _get_embeddings_client() -> AzureOpenAI:
    return AzureOpenAI(
        api_key=key("CONF_OPENAI_API_KEY"),
        api_version=key("CONF_API_VERSION"),
        azure_endpoint=key("CONF_AZURE_ENDPOINT"),
    )

def _embed_texts(texts: list[str]) -> list[list[float]]:
    """Devuelve embeddings 1536D. Usa tu deployment de embeddings."""
    client = _get_embeddings_client()
    deployment = key("CONF_AZURE_EMBEDDINGS_DEPLOYMENT")  # ej. text-embedding-3-small ó ada-002
    resp = client.embeddings.create(model=deployment, input=texts)
    return [d.embedding for d in resp.data]

def _chunk(text: str, max_chars: int = 1500) -> list[str]:
    # sencillo por chars; si quieres más fino, usa tiktoken por tokens
    text = (text or "").strip()
    out = []
    i = 0
    while i < len(text):
        out.append(text[i:i+max_chars])
        i += max_chars
    return out or [""]

def _build_docs_para_archivo(path: pathlib.Path, leccion: str, index_name: str) -> Iterable[Dict[str, Any]]:
    raw = path.read_text(encoding="utf-8", errors="ignore")
    trozos = _chunk(raw, max_chars=1600)

    # Embeddings en batch
    vectors = _embed_texts(trozos)

    for i, (texto, vec) in enumerate(zip(trozos, vectors)):
        yield {
            "id": f"{path.stem}__{i}__{uuid.uuid4().hex}",
            "content": texto,
            "contentVector": vec,
            "leccion": leccion
        }

def sincronizarBaseDeConocimiento(
    carpeta: str,
    nombreDeBaseDeConocimiento: str,
    tiempoDeEspera: int = 0,
    leccion_por_defecto: str = "general"
):
    """
    Sube documentos al índice 'nombreDeBaseDeConocimiento' (ej: 'curso-index'),
    rellenando id, content, contentVector (1536D) y leccion.
    """
    index_name = nombreDeBaseDeConocimiento  # p.ej. "curso-index"
    sc = _get_search_client(index_name)
    base = pathlib.Path(carpeta)

    # Estrategia para 'leccion': usa nombre de subcarpeta; si no, el valor por defecto.
    for subpath in base.rglob("*"):
        if not subpath.is_file():
            continue
        leccion = subpath.parent.name if subpath.parent != base else leccion_por_defecto

        docs = list(_build_docs_para_archivo(subpath, leccion, index_name))
        # Azure Search recomienda lotes de ~1000 docs o <16MB por batch
        # aquí subimos en bloques pequeños
        for i in range(0, len(docs), 100):
            batch = docs[i:i+100]
            sc.upload_documents(batch)
            if tiempoDeEspera:
                time.sleep(tiempoDeEspera)

