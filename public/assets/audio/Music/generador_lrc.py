import stable_whisper
import os

# CONFIGURACIÓN
ruta_audios = r"C:\Users\Felipe\Downloads\Audios"
ruta_bin_ffmpeg = r"C:\Users\Felipe\Downloads\Audios\ffmpeg-2026-04-19-git-de18feb0f0-full_build\bin"

def segundos_a_lrc(segundos):
    """Convierte segundos a formato LRC [mm:ss.xx]"""
    minutos = int(segundos // 60)
    segs = segundos % 60
    return f"[{minutos:02d}:{segs:05.2f}]"

def resultado_a_lrc(result, ruta_salida):
    """Genera archivo .lrc desde los segmentos del resultado."""
    with open(ruta_salida, 'w', encoding='utf-8') as f:
        for seg in result.segments:
            timestamp = segundos_a_lrc(seg.start)
            texto = seg.text.strip()
            f.write(f"{timestamp}{texto}\n")

def procesar_karaoke():
    os.environ["PATH"] += os.pathsep + ruta_bin_ffmpeg
    
    print("Cargando modelo small...")
    model = stable_whisper.load_model('small', device='cpu')

    archivos = [f for f in os.listdir(ruta_audios) if f.endswith('.mp3')]
    
    if not archivos:
        print("No se encontraron archivos .mp3")
        return

    for archivo in archivos:
        ruta_completa = os.path.join(ruta_audios, archivo)
        nombre_sin_ext = os.path.splitext(archivo)[0]
        ruta_salida = os.path.join(ruta_audios, f"{nombre_sin_ext}.lrc")

        if os.path.exists(ruta_salida):
            print(f"⏭️  Ya existe, saltando: {nombre_sin_ext}.lrc")
            continue

        print(f"Procesando: {archivo}...")
        
        try:
            result = model.transcribe(ruta_completa, language='en', fp16=False)
            resultado_a_lrc(result, ruta_salida)
            print(f"✅ EXITO: {nombre_sin_ext}.lrc generado.")
        except Exception as e:
            print(f"❌ ERROR en {archivo}: {e}")

if __name__ == "__main__":
    procesar_karaoke()