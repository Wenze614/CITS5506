from moisture import Moisture
from influx   import Influx
from pump     import Pump
from water    import Water
from config   import Config
import time
import os
class Watering:
    configmod = Config()
    '''
    water = Water()
    moisture = Moisture(channel=1)
    influx = Influx()
    pump = Pump()
    '''
    def __init__(self):
        self.configmod = Config()
        '''
        self.water = Water()
        self.moisture = Moisture(channel=1)
        self.influx = Influx()
        self.pump = Pump()
        '''
    def update_threshold(self,value):
        return self.configmod.update_MOISTRUE_THRESHOLD(value)
    def update_mode(self,value):
        return self.configmod.update_MODE(value)
    def get_threshold(self):
        return self.configmod.get_threshold()
    def get_mode(self):
        return self.configmod.get_MODE()
    def water_once(self):
        water = Water()
        have_water = water.water_level()
        influx = Influx()
        moisture = Moisture(channel=1)
        #if have water and moisture is lower than threshold, then pump water
        data,_time = moisture.get_moisture()
        if have_water :
            pump = Pump()
            print('Pumped')
            pump.pump(self.configmod.WATERING_TIME)
            influx.send_pumped(1.0, _time)
        else:
            influx.send_pumped(0.0, _time)
    def start_watering(self):
        try:
            os.remove('moisture.log')
            os.remove('water.log')
            os.remove('pump.log')
        except:
            pass

        while True:
            water = Water()
            moisture = Moisture(channel=1)
            influx = Influx()
            pump = Pump()
            self.configmod.__init__()
            if self.get_mode()=="MANUAL":
                data, _time = moisture.get_moisture()
                influx.send_moisture(data, _time)
                have_water = water.water_level()
                if have_water:
                    influx.send_water_level(1.0, _time)
                else:
                    influx.send_water_level(0.0, _time)
                print("it's manual mode now")
            else:
                print(f"threshold is: {self.get_threshold()}")
                print(f"current mode is: {self.get_mode()}")
                try:
                    data, _time = moisture.get_moisture()
                    influx.send_moisture(data, _time)
                    have_water = water.water_level()
                    #if have water and moisture is lower than threshold, then pump water
                    if have_water and data < self.configmod.MOISTRUE_THRESHOLD:
                        print(have_water,data)
                        pump.pump(self.configmod.WATERING_TIME)
                        influx.send_pumped(1.0, _time)
                    else:
                        influx.send_pumped(0.0, _time)

                    if have_water:
                        influx.send_water_level(1.0, _time)
                    else:
                        influx.send_water_level(0.0, _time)
                except Exception as e:
                    print(e)