import styles from "./ChangeVariables.module.css"
import {useState} from "react"
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
        if(isValid){
            props.updateThreshold(temp_threshold)
        }else{
            setTemp_Threshold(props.threshold)
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>{props.isAuto? "Automatic Mode" : "Manual Mode"}</h2>
            </div>
            <h3>Water Moisture Threshold</h3>
            <form onSubmit={submitHandler}>
                <input type="number" name="moistureThreshold" 
                    value={temp_threshold} 
                    onChange={changeTemp_Threshold} 
                    className={`${styles.inputBox} ${!isValid && styles.invalid}`}/>
                <input type="submit" value="Update" className={styles.btn} />
            </form>
        </div>
    );
};

export default ChangeVariables;