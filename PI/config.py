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
        with open('config.json', 'r') as f:
            d = json.load(f)
            self.INFLUX_TOKEN  = d['INFLUX_TOKEN']
            self.INFLUX_ORG    = d['INFLUX_ORG']
            self.INFLUX_BUCKET = d['INFLUX_BUCKET']
            self.INFLUX_URL    = d['INFLUX_URL']
            self.CLIENT        = d['CLIENT']
            self.WATERING_TIME = d['WATERING_TIME']
            self.MOISTRUE_THRESHOLD = d['MOISTRUE_THRESHOLD']
    
    def update_INFLUX_TOKEN(self, TOKEN):
        d={}
        with open('config.json', 'r') as f:
            d = json.load(f)
            d['INFLUX_TOKEN'] = TOKEN
            f.close()
        with open('config.json', 'w+') as f:
            json.dump(d, f)
            f.close()
    
    def update_INFLUX_ORG(self, ORG):
        d={}
        with open('config.json', 'r') as f:
            d = json.load(f)
            d['INFLUX_ORG'] = ORG
            f.close()
        with open('config.json', 'w+') as f:
            json.dump(d, f)
            f.close()

    def update_INFLUX_BUCKET(self, BUCKET):
        d={}
        with open('config.json', 'r') as f:
            d = json.load(f)
            d['INFLUX_BUCKET'] = BUCKET
            f.close()
        with open('config.json', 'w+') as f:
            json.dump(d, f)
            f.close()

    def update_INFLUX_URL(self, URL):
        d={}
        with open('config.json', 'r') as f:
            d = json.load(f)
            d['INFLUX_URL'] = URL
            f.close()
        with open('config.json', 'w+') as f:
            json.dump(d, f)
            f.close()
    
    def update_CLIENT(self, CLIENT):
        d={}
        with open('config.json', 'r') as f:
            d = json.load(f)
            d['CLIENT'] = CLIENT
            f.close()
        with open('config.json', 'w+') as f:
            json.dump(d, f)
            f.close()
    
    def update_WATERING_TIME(self, TIME):
        d={}
        with open('config.json', 'r') as f:
            d = json.load(f)
            d['WATERING_TIME'] = TIME
            f.close()
        with open('config.json', 'w+') as f:
            json.dump(d, f)
            f.close()
    
    def update_MOISTRUE_THRESHOLD(self, THRESHOLD):
        d={}
        with open('config.json', 'r') as f:
            d = json.load(f)
            d['MOISTRUE_THRESHOLD'] = THRESHOLD
            f.close()
        with open('config.json', 'w+') as f:
            json.dump(d, f)
            f.close()