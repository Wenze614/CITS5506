# Python 3 server example
from http.server import BaseHTTPRequestHandler, HTTPServer
import time
from pump import Pump
from influx   import Influx
from water import Water
from datetime import datetime

class MyServer(BaseHTTPRequestHandler):
    pump = Pump()
    influx = Influx()
    water = Water()
    def _set_response(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        
    def do_GET(self):
        self._set_response()
        _path = self.path
        _, _path = _path.split('?', 1)
        var, _time = _path.split('=', 1)
        if var == "time":
            try:
                _time = int(_time)
                if self.water.water_level():
                    self.pump.pump(_time)
                    self.influx.send_pumped(1.0, datetime.utcnow())
                    self.wfile.write("success".encode('utf-8'))
                else:
                    self.wfile.write("Not Enough water".encode('utf-8'))
            except Exception as e:
                print(e)
                self.wfile.write("unuccess".encode('utf-8'))
        else:
            self.wfile.write("unuccess".encode('utf-8'))

def server():
    hostName = ""
    serverPort = 8080
    webServer = HTTPServer((hostName, serverPort), MyServer)
    print("Server started http://%s:%s" % (hostName, serverPort))
    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass
    webServer.server_close()
    print("Server stopped.")

if __name__ == "__main__":        
    server()
