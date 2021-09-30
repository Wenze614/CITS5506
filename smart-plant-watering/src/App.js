import './App.css';
import SwitchButton from './components/SwitchButton/SwitchButton';
import {useState} from "react"
import WateringLog from './components/WateringLog/WateringLog';
import ChangeVariables from './components/ChangeVariables/ChangeVariables';
function App() {
  const [isAuto, setIsAuto] = useState(true)
  const [threshold, setThreshold] = useState(45)
  const switchMode = () => {
    setIsAuto(isAuto=>{return !isAuto})
    console.log(isAuto)
  }
  const updateThreshold = (new_threshold) =>{
    console.log("threshold updated to:" + new_threshold)
    setThreshold(new_threshold)
  }
  return (
    <>
      <SwitchButton isAuto={isAuto} switchMode={switchMode}/>
      <ChangeVariables isAuto={isAuto} threshold={threshold} updateThreshold={updateThreshold}/>
      <WateringLog/>
    </>
  );
}

export default App;
