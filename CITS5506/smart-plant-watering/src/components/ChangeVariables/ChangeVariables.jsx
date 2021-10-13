import styles from "./ChangeVariables.module.css"
import {useState} from "react"
import WateringModal from "../Modals/WateringModal";

const ChangeVariables = (props) => {
    
    const [temp_threshold, setTemp_Threshold] = useState(props.threshold)
    const [isValid, setIsValid] = useState(true)
    const changeTemp_Threshold = (event) =>{
        if (event.target.value <=0 || event.target.value>60)
        {
            setIsValid(false)
        }
        else{
            setIsValid(true)
        }
        setTemp_Threshold(event.target.value)

    }
    const submitHandler = (event) =>{
        event.preventDefault();
        const requestOptions = {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({measurement:'moisture_threshold',value:temp_threshold})
        }
        if(isValid){
            props.updateThreshold(temp_threshold)
            fetch("http://127.0.0.1:5000",requestOptions).then(response =>response.json())
            .then(data => console.log(data))
        }else{
            setTemp_Threshold(props.threshold)
            setIsValid(true)
        }
    }

    const [show, setShow] = useState(false)

    return (  
        <div>    
            { props.isAuto? 
                <div className={styles.autoContainer}>
                    <div className={styles.header}>
                        <h2>Automatic Mode</h2>
                    </div>
                    <h3>Water Moisture Threshold (%)</h3>
                    <form onSubmit={submitHandler}>
                        <input type="number" name="moistureThreshold" 
                            value={temp_threshold} 
                            onChange={changeTemp_Threshold} 
                            className={`${styles.inputBox} ${!isValid && styles.invalid}`}/>
                        <input type="submit" value="Update" className={styles.btn} />
                    </form>
                </div>
            : 
                <div className={styles.manualContainer}>
                    <button className={styles.wateringButton} onClick={() => setShow(true)}>WATER NOW</button>
                    <WateringModal onClose={() => setShow(false)} show={show} />
                </div>
            }
        </div>
    );
};

export default ChangeVariables;