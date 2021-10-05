import RPi.GPIO as GPIO
from config import Config
import time

class Pump:
    TRIGGER = 17
    def __init__(self, trigger=17):
        GPIO.setmode(GPIO.BCM)
        self.TRIGGER = trigger
        GPIO.setup(self.TRIGGER, GPIO.OUT)
        
    def pump(self, _time=Config.WATERING_TIME):
        GPIO.output(self.TRIGGER, GPIO.HIGH)
        time.sleep(_time)
        GPIO.output(self.TRIGGER, GPIO.LOW)
    def clean_up(self):
        GPIO.cleanup()

if __name__ == "__main__":
    mod = Pump()
    mod.pump()
    mod.clean_up()
        
    
    