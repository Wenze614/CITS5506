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

  // const mode_init = ()=>{
  //   const requestOptions = {
  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json' }
  //   }
  //   fetch("http://127.0.0.1:5000/mode", requestOptions)
  //     .then(response =>  {return response.json()})
  //     .then(data =>{ 
  //       console.log(data.value);
  //       if(data.value=="AUTO"){
  //         return true;
  //       }else{
  //         return false;
  //       } })
  // }

  const [isAuto, setIsAuto] = useState(true)
  const [threshold,setThreshold] = useState(45)

  const update_mode = useCallback((value) =>{
    setIsAuto(value)
  },[])
  const update_threshold = useCallback((value) =>{
    setThreshold(value)
  },[])
useFetchData('mode',update_mode)
useFetchData('threshold',update_threshold)

useEffect(()=>{
  console.log("isAuto: ",isAuto)
  console.log("threshold: ",threshold)
},[isAuto,threshold])
  // useEffect(() => {
  //   const requestOptions = {
  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json' }
  //   }
  //   fetch("http://127.0.0.1:5000/mode", requestOptions)
  //     .then(response => { return response.json() })
  //     .then(data => {
  //       console.log(data.value);
  //       if (data.value == "AUTO") {
  //         setIsAuto(true)
  //       } else {
  //         setIsAuto(false)
  //       }
  //     })

  //   fetch("http://127.0.0.1:5000/threshold", requestOptions)
  //     .then(response => { return response.json() })
  //     .then(data => {
  //       console.log(data.value);
  //       setThreshold(parseInt(data.value))
  //     })
  // }, [])

  const [moistureLog, setmoistureLog] = useState([])
  const [wateringLog, setWateringLog] = useState([])

  // const switchMode = () => {
  //   setIsAuto(isAuto => { return !isAuto })
  //   // console.log(isAuto)
  // }

  // useEffect(() => {
  //   const requestOptions = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ measurement: 'mode', value: `${isAuto ? "AUTO" : "MANUAL"}` })
  //   }
  //   fetch("http://127.0.0.1:5000", requestOptions).then(response => { return response.json() })
  //     .then(data => console.log(data))
  // }, [isAuto])



  // const updateThreshold = (new_threshold) => {
  //   // console.log("threshold updated to:" + new_threshold)
  //   setThreshold(new_threshold)
  // }

  // useEffect(() => {
  //   const requestOptions = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ measurement: 'moisture_threshold', value: threshold})
  //   }
  //   fetch("http://127.0.0.1:5000",requestOptions).then(response =>response.json())
  //   .then(data => console.log(data))

  // }, [threshold])

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
    const token = 'pYC3FIu_zwmV2xOW2pEJR5z4gkI97GHEyNNAfaTQWDc6h-39vTW4IW3LWSgIP39Sn94Jk7T6GxQ1E4Lwcy8rAg=='
    const org = 'my-org'
    const bucket = 'plant_db'
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

  const [show, setShow] = useState(false)

  useEffect(() => {
    console.log("extracting data from useEffect 1")
    dataExtraction();
  }, [dataExtraction])

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("extracting data from useEffect 2")
      dataExtraction();
    }, 300000);
    return () => clearTimeout(timer)
  });




  return (
    <>
      <Header />
      <SwitchButton isAuto={isAuto} switchMode={update_mode} />
      {/* <div> */}
      <button onClick={() => setShow(true)}>Show alert modal</button>
      <AlertModal onClose={() => setShow(false)} show={show} />
      {/* </div> */}
      <ChangeVariables isAuto={isAuto} threshold={threshold} updateThreshold={update_threshold} />
      <WateringLog wateringLog={wateringLog.reverse().slice(0, 10)} />
      <MoistureChart moistureLog={moistureLog}></MoistureChart>
    </>
  );
}

export default App;
