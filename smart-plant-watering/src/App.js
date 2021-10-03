import './App.css';
import SwitchButton from './components/SwitchButton/SwitchButton';
import {useState} from "react"
import WateringLog from './components/WateringLog/WateringLog';
import ChangeVariables from './components/ChangeVariables/ChangeVariables';
import MoistureChart from './components/chart/MoistureChart';
import Header from './components/Header/Header';

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

  return (
    <>
      <Header />
      <SwitchButton isAuto={isAuto} switchMode={switchMode}/>
      <ChangeVariables isAuto={isAuto} threshold={threshold} updateThreshold={updateThreshold} updateWateringLog={updateWateringLog}/>
      <WateringLog wateringLog={wateringLog}/>
      <MoistureChart wateringLog={wateringLog}></MoistureChart>
    </>
  );
}

export default App;
