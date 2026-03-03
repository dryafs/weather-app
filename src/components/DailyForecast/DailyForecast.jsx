import { selectDaily } from '../../utils/selectors';
import { iconFromWeatherCode, labelFromWeatherCode } from '../../utils/weathericons';
import styles from './dailyForeacst.module.css'

function DailyForecast({ weather, loading }) {
    if (loading) return <DailyForecastSkeleton />;

    const data = selectDaily(weather);
    if (!data.length) return null;

    return (
        <section className={styles.wrap}>
            <div>
                <p className={styles.title}>Daily forecast</p>
                <ul className={styles.list}>
                    {
                        data.map((d) => {
                            const day = new Date(d.date).toLocaleDateString("en-GB", { weekday: "short" });

                            return (
                                <li key={d.date} className={styles.item}>
                                    <p className={styles.day}>{day}</p>
                                    <img src={iconFromWeatherCode(d.code)} alt={labelFromWeatherCode(d.code)} />
                                    <div className={styles.temperatures}>
                                        <p>{Math.round(d.max)}°</p>
                                        <p>{Math.round(d.min)}°</p>
                                    </div>
                                </li>
                            )
                        })
                    }

                </ul>
            </div>
        </section>
    )
}

function DailyForecastSkeleton() {
    return (
        <section className={styles.wrap}>
            <div>
                <div className={`${styles.skeletonLine} ${styles.skeletonTitle}`}></div>
                <ul className={styles.list}>
                    {[0, 1, 2, 3, 4, 5, 6].map(i => (
                        <li key={i} className={`${styles.item} ${styles.itemSkeleton}`}>
                            <div className={`${styles.skeletonLine} ${styles.skeletonDay}`}></div>
                            <div className={`${styles.skeletonLine} ${styles.skeletonIcon}`}></div>
                            <div className={styles.temperatures}>
                                <div className={`${styles.skeletonLine} ${styles.skeletonTemp}`}></div>
                                <div className={`${styles.skeletonLine} ${styles.skeletonTemp}`}></div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default DailyForecast;