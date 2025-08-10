from backend.util.util_env import require as key
from langchain.retrievers import AzureCognitiveSearchRetriever


# Obtiene una base de conocimiento
def obtenerBaseDeConocimiento(identificador="", leccion: str | None = None):
    # Conexión a una base de conocimientos
    filtro_leccion = None
    if leccion:
        # Comparación exacta; asegúrate de que las mayúsculas/minúsculas coincidan con lo indexado
        filtro_leccion = f"leccion eq '{leccion}'"
    baseDeConocimiento: AzureCognitiveSearchRetriever = AzureCognitiveSearchRetriever(
        service_name=key("CONF_AZURE_SEARCH_SERVICE_NAME"),
        api_key=key("CONF_AZURE_SEARCH_KEY"),
        index_name=identificador,
        filter=filtro_leccion
    )

    return baseDeConocimiento
