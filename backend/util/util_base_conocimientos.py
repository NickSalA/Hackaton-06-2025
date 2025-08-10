from backend.util.util_env import require as key
from langchain.retrievers import AzureCognitiveSearchRetriever


# Obtiene una base de conocimiento
def obtenerBaseDeConocimiento(identificador="fundamentos"):
    # Conexión a una base de conocimientos
    baseDeConocimiento: AzureCognitiveSearchRetriever = AzureCognitiveSearchRetriever(
        service_name=key("CONF_AZURE_SEARCH_SERVICE_NAME"),
        api_key=key("CONF_AZURE_SEARCH_KEY"),
        index_name=identificador,
    )
    return baseDeConocimiento
