import backend.util.util_sincronizacion as sinc
import backend.util.util_env as key

sinc.sincronizarBaseDeConocimiento(
    carpeta = key.require("ARCHIVOS_DIR"),
    nombreDeBaseDeConocimiento = "bc-hack",  # usa el nombre real del índice
    tiempoDeEspera = 5,
    leccion_por_defecto = "fundamentos"          # si no hay subcarpetas
)