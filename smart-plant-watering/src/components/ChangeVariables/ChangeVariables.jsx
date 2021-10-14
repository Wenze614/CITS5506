import styles from "./ChangeVariables.module.css"
import {useEffect, useState} from "react"
import WateringModal from "../Modals/WateringModal";

const ChangeVariables = (props) => {
    
    const [temp_threshold, setTemp_Threshold] = useState(0)
    useEffect(()=>{
        setTemp_Threshold(props.threshold)
    },[props.threshold])
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

        if(isValid){
            props.updateThreshold(temp_threshold)

        }else{
            setTemp_Threshold(props.threshold)
            setIsValid(true)
        }
    }

    const [show, setShow] = useState(false)
    const waterNow = () =>{
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }
        fetch(`http://127.0.0.1:5000/water`, requestOptions)
            .then(response => { return response.json() })
            .then(data => {console.log(data)})
        setShow(true)
    }

    return (  
        <div>    
            { props.mode==="AUTO"? 
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
                    <button className={styles.wateringButton} onClick={() => waterNow()}>WATER NOW</button>
                    <WateringModal onClose={() => setShow(false)} show={show} />
                </div>
            }
        </div>
    );
};

export default ChangeVariables;