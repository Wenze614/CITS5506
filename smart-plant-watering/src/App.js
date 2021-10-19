import './App.css';
import SwitchButton from './components/SwitchButton/SwitchButton';
import { useState, useEffect, useCallback } from "react"
import WateringLog from './components/WateringLog/WateringLog';
import ChangeVariables from './components/ChangeVariables/ChangeVariables';
import MoistureChart from './components/chart/MoistureChart';
import Header from './components/Header/Header';
import AlertModal from './components/Modals/AlertModal';
import useFetchData from './hooks/useFetchData';

function App() {

  const [mode, setMode] = useState("AUTO")
  const [threshold, setThreshold] = useState(45)
  const update_mode = useCallback((value) => {
    setMode(value)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ measurement: 'mode', value:value})
    }
    fetch("http://172.20.10.8:5000/", requestOptions).then(response => { return response.json() })
      .then(data => console.log(data))
  }, [])

  const update_threshold = useCallback((value) => {
    setThreshold(value)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ measurement: 'moisture_threshold', value:value })
    }
    fetch("http://172.20.10.8:5000/", requestOptions).then(response => { return response.json() })
      .then(data => console.log(data))
  }, [])

  useFetchData('mode', update_mode)
  useFetchData('threshold', update_threshold)


  useEffect(() => {
    console.log("Mode: ", mode)
    console.log("threshold: ", threshold)
  }, [mode, threshold])

  const [moistureLog, setmoistureLog] = useState([])
  const [wateringLog, setWateringLog] = useState([])

  const updatemoistureLog = (time, measurement, value) => {
    setmoistureLog(moistureLog => { return [...moistureLog, { "time": time, "measurement": measurement, "value": value }] })
  }

  const clearmoistureLog = () => {
    setmoistureLog([])
  }
  const updateWateringeLog = (time, measurement) => {
    setWateringLog(moistureLog => { return [...moistureLog, { "date": time.toLocaleDateString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }), "measurement": measurement }] })
  }
 
  const clearWateringLog = () => {
    setWateringLog([])
  }

  const dataExtraction = useCallback(() => {
    clearmoistureLog()
    clearWateringLog()

    const { InfluxDB } = require('@influxdata/influxdb-client')

    // You can generate a Token from the "Tokens Tab" in the UI
    const token = 'byQ34ncFTRfQGfu1VCKdPkzBRXzOyZSIlqyiERveR_vtW3LSWUPqxbizy3IEKdfIKqJPhIniSZvLYg2Q7o8XQA=='
    const org = 'my-org'
    const bucket = 'plant'
    const client = new InfluxDB({ url: 'http://34.87.216.16:8086', token: token })

    const queryApi = client.getQueryApi(org)

    const query = `from(bucket: "${bucket}") |> range(start: -7d)`
    queryApi.queryRows(query, {
      next(row, tableMeta) {
        const o = tableMeta.toObject(row)
        if (o._measurement === "Moisture") {
          updatemoistureLog(o._time, o._measurement, o._value)
        }
        else if (o._measurement === "Water pumped") {
          updateWateringeLog(new Date(o._time), o._measurement)
        }
        // console.log(
        // `${o._time} ${o._measurement} in '${o.location}' (${o.example}): ${o._field}=${o._value}`
        // )
      },
      error(error) {
        console.error(error)
        console.log('\\nFinished ERROR')
      },
      complete() {
        console.log('\\nFinished SUCCESS')
      },
    })
  }, [])
 const fetch_water_level = useCallback(() => {
    console.log("preparing fetch water level")
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
  }
  fetch(`http://172.20.10.8:5000/water_level`, requestOptions)
      .then(response => { return response.json() })
      .then(data => {
         console.log("water level",data.value)
         if (data.value ==="no water"){
           setShow(true)
         }
          }
      )
 },[])
  const [show, setShow] = useState(false)

  useEffect(() => {
    console.log("extracting data from useEffect 1")
    dataExtraction();
    fetch_water_level()
  }, [dataExtraction,fetch_water_level])

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("extracting data from useEffect 2")
      dataExtraction();
      fetch_water_level()
    }, 10000);
    return () => clearTimeout(timer)
  });


  return (
    <>
      <Header />
      <SwitchButton mode={mode} update_mode={update_mode} />
      {/* <div> */}
      {/* <button onClick={() => setShow(true)}>Show alert modal</button> */}
      <AlertModal onClose={() => setShow(false)} show={show} />
      {/* </div> */}
      <ChangeVariables mode={mode} threshold={threshold} updateThreshold={update_threshold} />
      <WateringLog wateringLog={wateringLog.reverse().slice(0, 10)} />
      <MoistureChart moistureLog={moistureLog}></MoistureChart>
    </>
  );
}

export default App;
