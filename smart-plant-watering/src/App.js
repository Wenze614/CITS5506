import './App.css';
import SwitchButton from './components/SwitchButton/SwitchButton';
import {useState} from "react"
import WateringLog from './components/WateringLog/WateringLog';
import ChangeVariables from './components/ChangeVariables/ChangeVariables';
import MoistureChart from './components/chart/MoistureChart';
import Header from './components/Header/Header';
import AlertModal from './components/Modals/AlertModal';

function App() {
  const [isAuto, setIsAuto] = useState(true)
  const [threshold, setThreshold] = useState(45)
  const [wateringLog, setWateringLog] = useState([])
  
  const switchMode = () => {
    setIsAuto(isAuto=>{return !isAuto})
    console.log(isAuto)
  }
  const updateThreshold = (new_threshold) =>{
    console.log("threshold updated to:" + new_threshold)
    setThreshold(new_threshold)
  }
  const updateWateringLog = (time, measurement,value) =>{
    setWateringLog(wateringLog=>{return [...wateringLog,{"time":time,"measurement":measurement,"value":value}]})
  }

  const [show, setShow] = useState(false)

//   const {InfluxDB} = require('@influxdata/influxdb-client')

//     // You can generate a Token from the "Tokens Tab" in the UI
//   const token = 'pYC3FIu_zwmV2xOW2pEJR5z4gkI97GHEyNNAfaTQWDc6h-39vTW4IW3LWSgIP39Sn94Jk7T6GxQ1E4Lwcy8rAg=='
//   const org = 'my-org'
//   const bucket = 'plant_db'
//   const client = new InfluxDB({url: 'http://34.87.216.16:8086', token: token})   
    
//   const queryApi = client.getQueryApi(org)

//   const query = `from(bucket: "${bucket}") |> range(start: -7d)`
//   queryApi.queryRows(query, {
//       next(row, tableMeta) {
//       const o = tableMeta.toObject(row)
//       if(o._value!==0 && o._value!==100){
//           updateWateringLog(o._time,o._measurement,o._value)
//       }
//       // console.log(
//       // `${o._time} ${o._measurement} in '${o.location}' (${o.example}): ${o._field}=${o._value}`
//       // )
//   },
//   error(error) {
//       console.error(error)
//       console.log('\\nFinished ERROR')
//   },
//   complete() {
//       console.log('\\nFinished SUCCESS')
//   },
// })


  return (
    <>
      <Header />
      <SwitchButton isAuto={isAuto} switchMode={switchMode}/>
      {/* <div> */}
        <button onClick={() => setShow(true)}>Show alert modal</button>
        <AlertModal onClose={() => setShow(false)} show={show} />
      {/* </div> */}
      <ChangeVariables isAuto={isAuto} threshold={threshold} updateThreshold={updateThreshold} updateWateringLog={updateWateringLog}/>
      <WateringLog wateringLog={wateringLog}/>
      <MoistureChart wateringLog={wateringLog}></MoistureChart>
    </>
  );
}

export default App;
