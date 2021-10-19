import json
import time 
import os
import webbrowser

def get_MOISTRUE_THRESHOLD():
        d={}
        with open('config.json', 'r') as f:
            d = json.load(f)
            values = d['MOISTRUE_THRESHOLD']
            f.close()
            
            return values
            
            

def watering():
    watering_auto = True
    
    while watering_auto == True:
        water = Water()
        moisture = Moisture(channel=1)
        influx = Influx()
        pump = Pump()
        configmod = Config()
        MOISTURE_THRESHOLD = get_MOISTRUE_THRESHOLD()
        print(MOISTURE_THRESHOLD)
        #try:
        data, _time = moisture.get_moisture()
        print('Moisture', data)
        influx.send_moisture(data, _time)
        have_water = water.water_level()
        print('Have water', have_water)
        if have_water and data < MOISTURE_THRESHOLD:
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


def water_test():
    while True:
        print("water runs before")
        time.sleep(10)

#def runApp():
#    app.run(host='127.0.0.1',port=5000,debug = True)
        
        
    

if __name__=='__main__':
    water_test()
        
    
    
    
    
        
            
        
        
       
