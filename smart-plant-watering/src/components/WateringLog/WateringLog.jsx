import styles from "./WateringLog.module.css"

const WateringLog = (props) => {
    return (
        <div className={styles.logContainer}>
            <div className={styles.header}>
                <h2>Watering Log</h2>
            </div>
            <p>Water log content here</p>
            {/* <ul>
                {props.wateringLog.map(log=><li>{`${log.time}   ${log.measurement}   ${log.value}`}</li>)}
            </ul> */}
        </div>
    );
};

export default WateringLog;