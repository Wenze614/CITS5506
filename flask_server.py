from flask import Flask,request, jsonify
from flask_cors import CORS
from watering import Watering
from multiprocessing import Process, Value

import time

app = Flask(__name__)
CORS(app)

@app.route('/mode',methods=["GET"])
def get_mode():
    response = {
    'value':water.get_mode()
    }
    return jsonify(response)

@app.route('/threshold',methods=["GET"])
def get_threshold():
    response = {
        'value':water.get_threshold()
    }
    return jsonify(response)

@app.route('/water',methods=["GET"])
def water_now():
    water.water_once()
    response = {
        'status': "success",
        'value':"successfully watered"
    }
    return jsonify(response)


@app.route('/',methods=["POST"])
def update():
    values = request.get_json()
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
        try:
            water.update_threshold(int(value))
            response = {
                'message':f'successfully changed threshold to {water.get_threshold()}'
            }
            return jsonify(response)
        except:
            return jsonify({'message': 'Invalid value, Expect Int'})
    elif measurement=='mode':
        water.update_mode(value)
        response = {
            'message':f'successfully change threshold to {water.get_threshold()}'
        }
        return jsonify(response)
    return 
if __name__=='__main__':
    water = Watering()
    p = Process(target=water.start_watering)
    p.start()
    app.run(host='0.0.0.0',port=5000)
    p.join()