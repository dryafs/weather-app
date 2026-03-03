import styles from './CurrentCard.module.css'
import { selectCurrent } from '../../utils/selectors';
import { iconFromWeatherCode, labelFromWeatherCode } from '../../utils/weathericons';

function CurrentCard({ weather, place, loading }) {
    if (loading) return <CurrentCardSkeleton />;

    const current = selectCurrent(weather);
    if (!weather || !place) return null;

    const date = new Date(current.time);
    const day = date.toLocaleDateString("en-GB", { weekday: "long" });
    const dateText = date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short"
    });

    return (
        <section className={styles.wrap}>
            <div className={styles.card}>
                <div>
                    <p className={styles.location}>{place.name}, {place.country}</p>
                    <p className={styles.date}>{day}, {dateText}</p>
                </div>

                <div className={styles.right}>
                    <img src={iconFromWeatherCode(current.code)} alt={labelFromWeatherCode(current.code)} className={styles.weather_icon} />
                    <p className={styles.temperature}>{Math.round(current.temp)}°</p>
                </div>
            </div>
        </section>
    )
}

function CurrentCardSkeleton() {
    return (
        <section className={styles.wrap}>
            <div className={styles.cardSkeleton}>
                <div className={styles.skeletonLeft}>
                    <div className={`${styles.skeletonLine} ${styles.skeletonLocation}`}></div>
                    <div className={`${styles.skeletonLine} ${styles.skeletonDate}`}></div>
                </div>
                <div className={styles.skeletonRight}>
                    <div className={styles.skeletonIcon}></div>
                    <div className={styles.skeletonTemp}></div>
                </div>
            </div>
        </section>
    )
}

export default CurrentCard;