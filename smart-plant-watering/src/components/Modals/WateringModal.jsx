import styles from "./Modal.module.css"

const WateringModal = (props) => {
    if (!props.show) {
        return null
    }

    return (
        <div className={styles.modal} onClick={props.onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <button onClick={props.onClose} className={styles.closeBtn}>X</button>
                <div className={styles.modalHeader}>
                    <h2>Watering</h2>
                </div>
                <div className={styles.modalBody}>
                    <p>Watering process is completed.</p>
                </div>
            </div>
        </div>
    );
};

export default WateringModal;