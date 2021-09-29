import './App.css';
import SwitchButton from './components/SwitchButton/SwitchButton';
import {useState} from "react"
function App() {
  const [isAuto, setIsAuto] = useState(true)
  const switchMode = () => {
    setIsAuto(isAuto=>{return !isAuto})
    console.log(isAuto)
  }
  return (
    <>
      <SwitchButton isAuto={isAuto} switchMode={switchMode}/>
    </>
  );
}

export default App;
