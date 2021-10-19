from flask import Flask,request, jsonify
from flask_cors import CORS
from moisture import Moisture
from influx   import Influx
from pump     import Pump
from water    import Water
from config   import Config
import extra
from extra import get_MOISTRUE_THRESHOLD,water_test,watering
import os
import time
import webbrowser
import threading
import logging
#import subprocess


app = Flask(__name__)
CORS(app)

#logger = logging.basicConfig(filename='record.log')

@app.route("/", methods=['GET'])


    

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
    
    t2 = threading.Thread(target = watering).start()
    #app.logger.info(f'Start Thread 1')
    t1 = threading.Thread(target = app.run(host='0.0.0.0',port=5000,debug = True) ).start()
    #app.logger.info(f'Start Thread 2')
    
    #app.run(host='127.0.0.1',port=5000,debug = True)
    
    
