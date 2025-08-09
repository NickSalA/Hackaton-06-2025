
from langchain.chains.conversation.base import ConversationChain # from langchain.chain import ConversationChain
from langchain.memory import ConversationBufferMemory
from langchain.chains import RetrievalQA

# Abre la sesión de chat con el modelo
def abrirSesionDeChat(llm=None, contexto: str = "", memoria = None):
    # Creamos la memoria a corto plazo
    # Agregamos la "personalidad" a nuestra IA
    if memoria is None:
        memoria = ConversationBufferMemory()
    memoria.chat_memory.add_ai_message(contexto)

    # Creamos la conversación de chat
    chat = ConversationChain(
        llm=llm,
        memory=memoria,
        verbose=False,  # Desactivamos el log para ver sólo las respuestas del modelo
    )

    return chat


# Abre una sesión de chat y adjunta una base de conocimiento
def abrirSesionDeChatConBaseDeConocimiento(
    llm=None, basesDeConocimiento=None, contexto: str = "", memoria = None
):
    if memoria is None:
        memoria = ConversationBufferMemory()
    # Agregamos la "personalidad" a nuestra IA
    memoria.chat_memory.add_ai_message(contexto)

    # Creación del chat avanzado
    chat = RetrievalQA.from_chain_type(
        llm=llm, chain_type="stuff", retriever=basesDeConocimiento, memory=memoria
    )

    return chat


# Envía un mensaje a un chat
def enviarMensaje(chat: RetrievalQA.from_chain_type = None, mensaje=None):
    # Enviamos el mensaje
    respuesta = chat.predict(input=mensaje)

    return respuesta


# Envía un mensaje a un chat que tiene una base de conocimiento asociada
def enviarMensajeEnChatConBaseDeConocimiento(
    chat: RetrievalQA.from_chain_type = None, mensaje=None
):
    # Enviamos el mensaje
    respuesta = chat.invoke(mensaje)

    # Extraemos el mensaje
    return respuesta["result"]
