import styles from "./SwitchButton.module.css"
const SwitchButton = (props) =>{
    console.log(props)
    return (
        <div className={styles.switch_section}>
            <label className={styles.switch_button}>
                <input type="checkbox" 
                    checked={props.isAuto} 
                    onChange={props.switchMode}/>
                <span className={`${styles.slider} ${props.isAuto && styles.auto}`}>
                </span>
            </label>
        </div>
    )
}

export default SwitchButton;