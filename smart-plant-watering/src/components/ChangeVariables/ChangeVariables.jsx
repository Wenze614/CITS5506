import styles from "./ChangeVariables.module.css"
import {useState} from "react"
const ChangeVariables = (props) => {
    const {InfluxDB} = require('@influxdata/influxdb-client')

    // You can generate a Token from the "Tokens Tab" in the UI
    const token = 'pYC3FIu_zwmV2xOW2pEJR5z4gkI97GHEyNNAfaTQWDc6h-39vTW4IW3LWSgIP39Sn94Jk7T6GxQ1E4Lwcy8rAg=='
    const org = 'my-org'
    const bucket = 'plant_db'
    const client = new InfluxDB({url: 'http://34.87.216.16:8086', token: token})   
    
    const onClick = () => {
        const queryApi = client.getQueryApi(org)

        const query = `from(bucket: "${bucket}") |> range(start: -7d)`
        queryApi.queryRows(query, {
        next(row, tableMeta) {
            const o = tableMeta.toObject(row)
            if(o._value!==0 && o._value!==100){
                props.updateWateringLog(o._time,o._measurement,o._value)
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
    }

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
            setIsValid(true)
        }
    }
    return (  
        <div className={`${styles.container} ${!props.isAuto && styles.manual}`}>
            <div className={styles.header}>
                <h2>{props.isAuto? "Automatic Mode" : "Manual Mode"}</h2>
            </div>
            { props.isAuto? 
            <div>
            <h3>Water Moisture Threshold</h3>
            <form onSubmit={submitHandler}>
                <input type="number" name="moistureThreshold" 
                    value={temp_threshold} 
                    onChange={changeTemp_Threshold} 
                    className={`${styles.inputBox} ${!isValid && styles.invalid}`}/>
                <input type="submit" value="Update" className={styles.btn} />
            </form>
            </div>
            : <button className={styles.watering_button} onClick={onClick}>WATERING NOW</button>
            }
        </div>
    );
};

export default ChangeVariables;