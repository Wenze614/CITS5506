import json

def get_MOISTRUE_THRESHOLD():
        d={}
        with open('config.json', 'r') as f:
            d = json.load(f)
            values = d['MOISTRUE_THRESHOLD']
            f.close()
            
            return values
        
        
get_MOISTRUE_THRESHOLD()       
