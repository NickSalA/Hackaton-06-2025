import os
from flask_cors import CORS
from flask_cors import CORS

from flask import Flask, render_template, request, jsonify, session

from backend.flow.FlowChatbot import FlowChatbot

import backend.util.util_env as key
from backend.util import util_base_conocimientos as ubc
import backend.util.util_app as util_app
from langgraph.checkpoint.memory import InMemorySaver
from langchain_core.runnables.config import RunnableConfig
import backend.util.util_audio as ua
import uuid
from backend.util import util_llm



app = Flask(__name__)
app.secret_key = os.urandom(24)
CORS(app, origins=["http://localhost:3000"])
CORS(app)

chatbot: FlowChatbot = FlowChatbot(
    archivoDeUsuario=key.require("ARCHIVO_USUARIO_DIR"),
    basesDeConocimiento=ubc.obtenerBaseDeConocimiento("fundamentos"),
)

chatbot.grafo = chatbot.constructor.compile(checkpointer=InMemorySaver())


@app.before_request
def ensureThread():
    if "thread_id" not in session:
        session["thread_id"] = str(uuid.uuid4())


@app.route("/chat", methods=["POST"])
def chat():
    # 1. Recibe los datos como JSON
    datos = request.get_json()
    promptUsuario = util_app.obtener_prompt(datos)
    tipo = promptUsuario.get("tipo")
    base = datos.get("base", False)
    contenido = datos.get("prompt", {}).get("contenido", "")
    if tipo == "audio":
        contenido = ua.transcribir_audio_base64_a_texto(contenido)
    promptUsuario = {"tipo": "texto", "contenido": contenido}
    print("FLASK ENVIA AL FLUJO:", promptUsuario)

    # 3. Ejecuta el flujo y devuelve la respuesta
    config: RunnableConfig = {"configurable": {"thread_id": session["thread_id"]}}
    try:
        usarBase = "fundamentos"
        respuestaModelo = chatbot.ejecutar(
            prompt=promptUsuario, base=usarBase, config=config
        )
        state = chatbot.grafo.get_state(config)
    except Exception as e:
        return jsonify({"error": f"Error al procesar la solicitud. {str(e)}"}), 500
    print("DEBUG ▶︎ Salida del grafo:", respuestaModelo)
    print("DEBUG ▶︎ Base de conocimiento:", type(chatbot.basesDeConocimiento), chatbot.basesDeConocimiento)
    return jsonify(respuestaModelo)

@app.route("/reset", methods=["POST"])
def reset():
    try:
        chatbot.reiniciar_memoria_del_chatbot()
        return jsonify({"status": "ok", "mensaje": "Memoria reiniciada"}), 200
    except Exception as e:
        return jsonify({"status": "error", "detalle": str(e)}), 500



if __name__ == "__main__":
    app.run(debug=True)

