import backend.util.util_sincronizacion as sinc
import backend.util.util_env as key

sinc.sincronizarBaseDeConocimiento(
    carpeta = key.require("ARCHIVOS_DIR"),
    nombreDeBaseDeConocimiento = "fundamentos",  # usa el nombre real del índice
    tiempoDeEspera = 5,        # si no hay subcarpetas
)