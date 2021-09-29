import styles from "./WateringLog.module.css"

const WateringLog = () => {
    return (
        <div className={styles.logContainer}>
            <div className={styles.header}>
                <h2>Watering Log</h2>
            </div>
            <p>Water log content here</p>
        </div>
    );
};

export default WateringLog;