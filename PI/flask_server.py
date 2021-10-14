from flask import Flask,request
from flask_cors import CORS

import time
from pump import Pump
from influx   import Influx
from water import Water
from datetime import datetime
from config import Config

app = Flask(__name__)
CORS(app)

@app.route("/", methods=['GET'])
def hello():
    return "Hello World!"

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
        response = {
            'message':f'change threshold to {value}'
        }
        return response, 200
    return 
if __name__=='__main__':
    app.run(host='0.0.0.0',port=5000)