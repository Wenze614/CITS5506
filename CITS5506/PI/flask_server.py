from flask import Flask,request, jsonify
from flask_cors import CORS
from moisture import Moisture
from influx   import Influx
from pump     import Pump
from water    import Water
from config   import Config
import extra
from extra import get_MOISTRUE_THRESHOLD
import os
import time



app = Flask(__name__)
CORS(app)

@app.route("/", methods=['GET'])
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

    

@app.route('/',methods=["POST"])
def update():
    values = request.get_json()
    configmod = Config()

    if not values:
        response={
            'message':'No data found'
        }
        return jsonify(response)
    required_fields = ['measurement','value']
    if not all(field in values for field in required_fields ):
        response ={
            'message':'Required data is missing'
        }
        return jsonify(response)
    measurement = values['measurement']
    value = values['value']
    if measurement == 'moisture_threshold':
        configmod.update_MOISTRUE_THRESHOLD(value)
        
        response = {
            'message':f'change threshold to {value}'
        }
        return jsonify(response)
    return 
if __name__=='__main__':
    app.run(host='0.0.0.0',port=5000,debug = True)