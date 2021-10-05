from moisture import Moisture
from influx   import Influx
from pump     import Pump
from water    import Water
from config   import Config
from server import server

import time
import socket
from http.server import BaseHTTPRequestHandler, HTTPServer
import asyncio

if __name__ == "__main__":
    water = Water()
    moisture = Moisture(1)
    influx = Influx()
    pump = Pump()
    server()
    
    while True:
        #try:
        data, _time = moisture.get_moisture()
        influx.send_moisture(data, _time)
        have_water = water.water_level()
        if have_water and data < Config.MOISTRUE_THRESHOLD:
            pump.pump()
            influx.send_pumped(1.0, _time)
        else:
            influx.send_pumped(0.0, _time)

        if have_water:
            influx.send_water_level(1.0, _time)
        else:
            influx.send_water_level(0.0, _time)

        time.sleep(3600*12)
        #except Exception as e:
        #    time.sleep(10)
        #    print(e)

            
    

        