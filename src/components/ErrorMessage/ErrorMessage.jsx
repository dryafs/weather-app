import styles from './errorMessage.module.css';
import reloading from '../../images/reloading_icon.svg'

const ErrorMessage = () => {
    return(
        <div className={styles.wrap}>
            <p className={styles.title}>Someting went wrong</p>
            <p className={styles.descr}>We couldn't connect to the server(API error). Please try again in a few moments</p>
            <button className={styles.button} onClick={() => window.location.reload()}>
                <img src={reloading} alt="reloading icon" className={styles.button_icon}/>
                <p className={styles.button_text}>Retry</p>
            </button>
        </div>
    )
}

export default ErrorMessage;