import styles from "./Header.module.css"
import logo from '../../images/logo.png'

const Header = () => {
    return (
        <div className={styles.container}>
            <img src={logo} className={styles.logo} alt="Smart Indoor Plant Watering System" />
        </div>
    );
};

export default Header;