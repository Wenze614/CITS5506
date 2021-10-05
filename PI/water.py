import RPi.GPIO as GPIO
import time
class Water:
    TRIGGER = 16
    def __init__(self, trigger=16):
        GPIO.setmode(GPIO.BCM)
        self.TRIGGER = trigger
        GPIO.setup(self.TRIGGER, GPIO.IN)
    
    def water_level(self):
        for i in range(0, 20):
            if GPIO.input(self.TRIGGER) == 1:
                return True
            time.sleep(0.1)
        return False
    
    def clean_up(self):
        GPIO.cleanup()

if __name__ == "__main__":
    mod = Water()
    while True:
        print(mod.water_level())
        time.sleep(1)