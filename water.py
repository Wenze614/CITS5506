import RPi.GPIO as GPIO
import time
class Water:
    TRIGGER = 16
    def __init__(self, trigger=16):
        ''' 
        Args:
        trigger (int): The GPIO port to check the port contain water or not
        '''

        GPIO.setmode(GPIO.BCM)
        self.TRIGGER = trigger
        GPIO.setup(self.TRIGGER, GPIO.IN)
    
    def water_level(self):
        ''' Use a for loop to check still have water in water container, to reduce the sensor error
        ''' 
        for i in range(0, 5):
            if GPIO.input(self.TRIGGER) == 1:
                return True
            time.sleep(0.1)
        self.clean_up()
        return False
    
    def clean_up(self):
        '''Clean up the GPIO port
        '''
        GPIO.cleanup()

#if __name__ == "__main__":
    #mod = Water()
    #while True:
        #print(mod.water_level())
        #time.sleep(1)
