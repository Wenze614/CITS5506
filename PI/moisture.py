import spidev
from datetime import datetime

class Moisture():
    spi = spidev.SpiDev()
    channel = None
    def __init__(self, channel, port=0, max_speed=1000000):
        self.channel = channel
        self.spi.open(port,0)
        self.spi.max_speed_hz=max_speed
        
    # Function to read SPI data from MCP3208 chip
    # Channel must be an integer 0-7
    def _read_channel(self, places=2):
      adc = self.spi.xfer2([1,(8+self.channel)<<4,0])
      data = ((adc[1]&3) << 8) + adc[2]
      return round(data, places), datetime.utcnow()
    
    def _moisture_ATD(self, value):
        if value > 500:
            value = 500
        elif value < 0:
            value = 0
        
        return (value/500)*100
    
    def get_moisture(self):
        data, _time = self._read_channel()
        return self._moisture_ATD(data), _time

if __name__ == "__main__":
    import time
    from influx import Influx
    mod = Moisture(1)
    flux = Influx()
    while True:
        data, _time = mod.get_moisture()
        #print(data)
        #flux.send_moisture(data, _time)
        time.sleep(1)
    
    
    
