import styles from "./ChangeVariables.module.css"
import {useState} from "react"
const ChangeVariables = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>{props.isAuto? "Automatic Mode" : "Manual Mode"}</h2>
            </div>
            <h3>Water Moisture Threshold</h3>
            <form>
                <input type="number" name="moistureThreshold" className={styles.inputBox} />
                <input type="submit" value="Update" className={styles.btn} />
            </form>
        </div>
    );
};

export default ChangeVariables;