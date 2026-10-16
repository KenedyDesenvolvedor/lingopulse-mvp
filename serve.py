"""Start a loopback-only web server for the LingoPulse static app."""

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Timer
import argparse
import webbrowser


PROJECT_DIR = Path(__file__).resolve().parent


class LingoPulseHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(PROJECT_DIR), **kwargs)


def main():
    parser = argparse.ArgumentParser(description="Serve the LingoPulse static app locally.")
    parser.add_argument("--no-browser", action="store_true", help="Do not open a browser automatically.")
    args = parser.parse_args()
    server = ThreadingHTTPServer(("127.0.0.1", 0), LingoPulseHandler)
    url = f"http://127.0.0.1:{server.server_port}/"
    print(f"LingoPulse está disponível em {url}", flush=True)
    print("Deixe esta janela aberta. Pressione Ctrl+C para encerrar.", flush=True)
    if not args.no_browser:
        timer = Timer(0.6, webbrowser.open, args=(url,))
        timer.daemon = True
        timer.start()
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor do LingoPulse encerrado.", flush=True)
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
