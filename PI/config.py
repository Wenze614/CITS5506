import json
class Config:
    INFLUX_TOKEN = "-oE8_GSb474E1tPUlBhrfhdw15LdFYECnWWuUutvHgreSlCqH6h5eICo1C222upbHGIrbZhP2I1nnjJRaGfBwg=="
    INFLUX_ORG = "my-org"
    INFLUX_BUCKET = "plant_db"
    INFLUX_URL = "http://34.87.216.16:8086"
    CLIENT = "CLIENT1"
    WATERING_TIME = 1
    MOISTRUE_THRESHOLD = 40
    def __init__(self):
        with open('config.json') as f:
            d = json.load(f)
            self.INFLUX_TOKEN  = d['INFLUX_TOKEN']
            self.INFLUX_ORG    = d['INFLUX_ORG']
            self.INFLUX_BUCKET = d['INFLUX_BUCKET']
            self.INFLUX_URL    = d['INFLUX_URL']
            self.CLIENT        = d['CLIENT']
            self.WATERING_TIME = d['WATERING_TIME']
            self.MOISTRUE_THRESHOLD = d['MOISTRUE_THRESHOLD']
    
    def update_INFLUX_TOKEN(self, TOKEN):
        with open('config.json') as f:
            d = json.load(f)
            d['INFLUX_TOKEN'] = TOKEN
            json.dump(d, f)
    
    def update_INFLUX_ORG(self, ORG):
        with open('config.json') as f:
            d = json.load(f)
            d['INFLUX_ORG'] = ORG
            json.dump(d, f)

    def update_INFLUX_BUCKET(self, BUCKET):
        with open('config.json') as f:
            d = json.load(f)
            d['INFLUX_BUCKET'] = BUCKET
            json.dump(d, f)

    def update_INFLUX_URL(self, URL):
        with open('config.json') as f:
            d = json.load(f)
            d['INFLUX_URL'] = URL
            json.dump(d, f)
    
    def update_CLIENT(self, CLIENT):
        with open('config.json') as f:
            d = json.load(f)
            d['CLIENT'] = CLIENT
            json.dump(d, f)
    
    def update_WATERING_TIME(self, TIME):
        with open('config.json') as f:
            d = json.load(f)
            d['WATERING_TIME'] = TIME
            json.dump(d, f)
    
    def update_MOISTRUE_THRESHOLD(self, THRESHOLD):
        with open('config.json') as f:
            d = json.load(f)
            d['MOISTRUE_THRESHOLD'] = THRESHOLD
            json.dump(d, f)

