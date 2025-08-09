import os
from langchain_openai import AzureChatOpenAI
from backend.util.util_env import require as key

def obtenerModelo(temperature: float = 0.7):
  #Conexión a un modelo
  llm = AzureChatOpenAI(
      api_version = key("CONF_API_VERSION"),
      azure_endpoint = key("CONF_AZURE_ENDPOINT"),
      openai_api_key = key("CONF_OPENAI_API_KEY"),
      azure_deployment = key("CONF_AZURE_DEPLOYMENT"),
      temperature= temperature,
  )

  return llm
