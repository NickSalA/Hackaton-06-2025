import os
from flask_cors import CORS
from flask import Flask, request, jsonify, session
from backend.flow.FlowChatbot import FlowChatbot

import backend.util.util_env as key
from backend.util import util_base_conocimientos as ubc
import backend.util.util_app as util_app
from langgraph.checkpoint.memory import InMemorySaver
from langchain_core.runnables.config import RunnableConfig
import backend.util.util_audio as ua
import uuid

app = Flask(__name__)
app.secret_key = os.urandom(24)
CORS(app, origins=["http://localhost:3000"])
CORS(app)

# Inicializa el chatbot sin filtro de lección al arrancar
chatbot: FlowChatbot = FlowChatbot(
    archivoDeUsuario=key.require("ARCHIVO_USUARIO_DIR"),
    basesDeConocimiento=ubc.obtenerBaseDeConocimiento("fundamentos", leccion=None),
)
chatbot.grafo = chatbot.constructor.compile(checkpointer=InMemorySaver())

@app.before_request
def ensureThread():
    if "thread_id" not in session:
        session["thread_id"] = str(uuid.uuid4())

@app.route("/chat", methods=["POST"])
def chat():
    datos = request.get_json()
    promptUsuario = util_app.obtener_prompt(datos)
    tipo = promptUsuario.get("tipo")
    contenido = datos.get("prompt", {}).get("contenido", "")
    if tipo == "audio":
        contenido = ua.transcribir_audio_base64_a_texto(contenido)
    promptUsuario = {"tipo": "texto", "contenido": contenido}
    print("FLASK ENVIA AL FLUJO:", promptUsuario)

    # Si el front-end envía la lección, actualiza la base de conocimiento
    leccion = datos.get("leccion")
    if leccion and leccion != session.get("leccion"):
        session["leccion"] = leccion
        # Construye un nuevo retriever filtrando por la lección
        chatbot.basesDeConocimiento = ubc.obtenerBaseDeConocimiento("fundamentos", leccion=leccion)
        # Vuelve a compilar el grafo con el nuevo retriever
        chatbot.grafo = chatbot.constructor.compile(checkpointer=InMemorySaver())

    config: RunnableConfig = {"configurable": {"thread_id": session["thread_id"]}}
    try:
        # Ejecuta el flujo usando la base "fundamentos"
        respuestaModelo = chatbot.ejecutar(
            prompt=promptUsuario,
            base="fundamentos",
            config=config
        )
    except Exception as e:
        return jsonify({"error": f"Error al procesar la solicitud. {str(e)}"}), 500

    print("DEBUG ▶︎ Salida del grafo:", respuestaModelo)
    return jsonify(respuestaModelo)

@app.route("/reset", methods=["POST"])
def reset():
    try:
        chatbot.reiniciar_memoria_del_chatbot()
        # Opcional: elimina la lección almacenada en la sesión
        session.pop("leccion", None)
        return jsonify({"status": "ok", "mensaje": "Memoria reiniciada"}), 200
    except Exception as e:
        return jsonify({"status": "error", "detalle": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
