import styles from "./ChangeVariables.module.css"

const ChangeVariables = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Automatic mode</h2>
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