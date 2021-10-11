import styles from "./WateringLog.module.css"

const WateringLog = (props) => {
    return (
        <div className={styles.logContainer}>
            <div className={styles.header}>
                <h2>Watering Log</h2>
            </div>
            <p>Water log content here</p>
            <ul>
                {props.wateringLog.slice(-10).map(log=><li>{`${Date(log.time)}  ${log.measurement}`}</li>)}
            </ul>
        </div>
    );
};

export default WateringLog;