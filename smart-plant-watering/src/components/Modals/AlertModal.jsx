import styles from "./Modal.module.css"

const AlertModal = (props) => {
    if (!props.show) {
        return null
    }

    return (
        <div className={styles.modal} onClick={props.onClose}>
            <div className={styles.modalContentAlert} onClick={e => e.stopPropagation()}>
                <button onClick={props.onClose} className={styles.closeBtn}>X</button>
                <div className={styles.modalHeaderAlert}>
                    <h2>Alert</h2>
                </div>
                <div className={styles.modalBody}>
                    <p>Water container level is low! <br /><br />Please fill up the water container.</p>
                </div>
            </div>
        </div>
    );
};

export default AlertModal;