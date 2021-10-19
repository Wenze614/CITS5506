from moisture import Moisture
from influx   import Influx
from pump     import Pump
from water    import Water
from config   import Config
import os
import time

if __name__ == "__main__":
    # Clean log file
    try:
        os.remove('moisture.log')
        os.remove('water.log')
        os.remove('pump.log')
    except:
        print("no file")

    while True:
        water = Water()
        moisture = Moisture(channel=1)
        influx = Influx()
        pump = Pump()
        configmod = Config()
        print(configmod.MOISTRUE_THRESHOLD)
        #try:
        data, _time = moisture.get_moisture()
        print('Moisture', data)
        influx.send_moisture(data, _time)
        have_water = water.water_level()
        print('Have water', have_water)
        if have_water and data < configmod.MOISTRUE_THRESHOLD:
            pump.pump(configmod.WATERING_TIME)
            influx.send_pumped(1.0, _time)
        else:
            influx.send_pumped(0.0, _time)

        if have_water:
            influx.send_water_level(1.0, _time)
        else:
            influx.send_water_level(0.0, _time)
        time.sleep(10)
        #except Exception as e:
        #   time.sleep(10)
        #   print(e)

            
    

        
