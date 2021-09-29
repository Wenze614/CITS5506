import './App.css';
import SwitchButton from './components/SwitchButton/SwitchButton';
import {useState} from "react"
import WateringLog from './components/WateringLog/WateringLog';
import ChangeVariables from './components/ChangeVariables/ChangeVariables';
function App() {
  const [isAuto, setIsAuto] = useState(true)
  const switchMode = () => {
    setIsAuto(isAuto=>{return !isAuto})
    console.log(isAuto)
  }
  return (
    <>
      <SwitchButton isAuto={isAuto} switchMode={switchMode}/>
      <ChangeVariables/>
      <WateringLog/>
    </>
  );
}

export default App;
