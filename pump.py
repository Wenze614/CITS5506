import RPi.GPIO as GPIO
import time

class Pump:
    TRIGGER = 17
    def __init__(self, trigger=17):
        ''' 
        Args:
        trigger (int): The GPIO port to check the port contain water or not
        '''
        GPIO.setmode(GPIO.BCM)
        self.TRIGGER = trigger
        GPIO.setup(self.TRIGGER, GPIO.OUT)
        
    def pump(self, _time=2):
        ''' open pump and pump water for a specific amount of time
        arge:
        _time (int): the time allow the pump to work in seconds
        '''
        GPIO.output(self.TRIGGER, GPIO.HIGH)
        time.sleep(_time)
        GPIO.output(self.TRIGGER, GPIO.LOW)
        self.clean_up()
    
    def clean_up(self):
        '''Clean up the GPIO port
        '''
        GPIO.cleanup()

if __name__ == "__main__":
    mod = Pump()
    print(mod.TRIGGER)
    mod.pump()
    mod.clean_up()
