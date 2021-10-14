import styles from "./SwitchButton.module.css"
const SwitchButton = (props) =>{
    const handleClick=()=>{
        if (props.mode==="AUTO"){
            props.update_mode("MANUAL")
        }else{
            props.update_mode("AUTO")
        }

    }
    return (
        <div className={styles.switch_section}>
            <label className={styles.switch_button}>
                <input type="checkbox" 
                    checked={props.mode==="AUTO"? true:false} 
                    onChange={handleClick}/>
                <span className={`${styles.slider} ${(props.mode==="AUTO"? true:false) && styles.auto}`}>
                </span>
            </label>
        </div>
    )
}

export default SwitchButton;