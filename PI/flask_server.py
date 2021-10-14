from flask import Flask,request
from flask_cors import CORS
from watering import Watering
from multiprocessing import Process, Value
import time

import time

app = Flask(__name__)
CORS(app)

@app.route('/mode',methods=["GET"])
def get_mode():
    response = {
    'value':water.get_mode()
    }
    return response,200

@app.route('/threshold',methods=["GET"])
def get_threshold():
    response = {
        'value':water.get_threshold()
    }
    return response,200

@app.route('/',methods=["POST"])
def update():
    values = request.get_json()
    if not values:
        response={
            'message':'No data found'
        }
        return response, 400
    required_fields = ['measurement','value']
    if not all(field in values for field in required_fields ):
        response ={
            'message':'Required data is missing'
        }
        return response, 400
    measurement = values['measurement']
    value = values['value']
    if measurement == 'moisture_threshold':
        water.update_threshold(value)
        response = {
            'message':f'successfully changed threshold to {water.get_threshold()}'
        }
        return response, 200
    elif measurement=='mode':
        water.update_mode(value)
        response = {
            'message':f'successfully change threshold to {water.get_threshold()}'
        }
        return response, 200
    return 
if __name__=='__main__':
    water = Watering()
    p = Process(target=water.start_watering)
    p.start()
    app.run(host='0.0.0.0',port=5000)
    p.join()