from config import Config
from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS
from urllib.request import urlopen
import os
from datetime import datetime

class Influx:
    client        = None
    write_api     = None
    moisture_data = 0
    water_data    = 0
    pumped_data   = 0
    TIMEFORMAT    = "%Y-%m-%d %H:%M:%S.%f"
    
    def __init__(self):
        self.client = InfluxDBClient(url=Config.INFLUX_URL, token=Config.INFLUX_TOKEN)
        self.write_api = self.client.write_api(write_options=SYNCHRONOUS)
    
    def send_moisture(self, measure, _time):
        if self._check_internet():
            if self.moisture_data > 0:
                self._send_load('moisture.log', "Moisture","Moisture_percentage")
            
            point = Point("Moisture").tag("Client", Config.CLIENT).field("Moisture_percentage", measure).time(_time, WritePrecision.NS)
            self.write_api.write(Config.INFLUX_BUCKET, Config.INFLUX_ORG, point)
            self.moisture_data = 0
        else:
            try:
                with open('moisture.log', 'a') as myfile:
                    myfile.write(str(measure)+','+ _time.strftime(self.TIMEFORMAT)+'\n')
                self.moisture_data+=1
            except Exception as e:
                print(e)

    def send_water_level(self, measure, _time):
        if self._check_internet():
            if self.water_data > 0:
                self._send_load('water.log', "Water level","Water_level")
                
            point = Point("Water level").tag("Client", Config.CLIENT).field("Water_level", measure).time(_time, WritePrecision.NS)
            self.write_api.write(Config.INFLUX_BUCKET, Config.INFLUX_ORG, point)
            self.water_data    = 0
        else:
            try:
                with open('water.log', 'a') as myfile:
                    myfile.write(str(measure)+','+ _time.strftime(self.TIMEFORMAT)+'\n')
                self.water_data+=1
            except Exception as e:
                print(e)

    def send_pumped(self, measure, _time):
        if self._check_internet():
            if self.pumped_data>0:
                self._send_load('pump.log', "Water level","Water_level")
    
            point = Point("Water pumped").tag("Client", Config.CLIENT).field("Pumped", measure).time(_time, WritePrecision.NS)
            self.write_api.write(Config.INFLUX_BUCKET, Config.INFLUX_ORG, point)
            self.pumped_data   = 0
        else:
            try:
                with open('pump.log', 'a') as myfile:
                    myfile.write(str(measure)+','+ _time.strftime(self.TIMEFORMAT)+'\n')
                self.pumped_data+=1
            except Exception as e:
                print(e)
    
    def _check_internet(self):
        try:
            response = urlopen("https://www.google.com.au/", timeout=10)
            return True
        except:
            return False
    
    def _send_load(self, filename, measurement, field):
        try:
            with open(filename, 'r') as file:
                for line in file:
                    measure, _time = line.strip().split(',')
                    point = Point(measurement).tag("Client", Config.CLIENT).field(field, float(measure)).time(datetime.strptime(_time, self.TIMEFORMAT), WritePrecision.NS)
                    self.write_api.write(Config.INFLUX_BUCKET, Config.INFLUX_ORG, point)
            os.remove(filename)
        except Exception as e:
                print(e)

#if __name__ == "__main__":
#    flux = Influx()
#    while True:
#        flux._send_load('moisture.log', "Moisture","Moisture_percentage")

    
    
        