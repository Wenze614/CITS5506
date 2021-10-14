import styles from "./WateringLog.module.css"

const WateringLog = (props) => {
    return (
        <div className={styles.logContainer}>
            <div className={styles.header}>
                <h2>Watering Log</h2>
            </div>
            <div className={styles.tableContainer}>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.wateringLog.map(log=>
                            <tr key={log.date}>
                                <td>{`${(log.date.slice(0,10))}`}</td>
                                <td>{`${(log.date.slice(11))}`}</td>
                            </tr>
                            
                        )}
                    </tbody>
                </table>
            </div> 
        </div>
    );
};

export default WateringLog;