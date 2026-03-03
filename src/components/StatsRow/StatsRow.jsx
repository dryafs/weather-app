import { selectStats } from '../../utils/selectors';
import styles from './statsRow.module.css';

function StatsRow({ weather, loading }) {
    if (loading) return <StatsRowSkeleton />;

    const data = selectStats(weather);
    if (!data) return null;

    return (
        <section className={styles.wrap}>
            <div>
                <ul className={styles.indicators}>
                    <li className={styles.item}>
                        <p className={styles.name}>Feels Like</p>
                        <p className={styles.indicate}>{data.feelsLike.value}°</p>
                    </li>
                    <li className={styles.item}>
                        <p className={styles.name}>Humidity</p>
                        <p className={styles.indicate}>{data.humidity.value}%</p>
                    </li>
                    <li className={styles.item}>
                        <p className={styles.name}>Wind</p>
                        <p className={styles.indicate}>{data.wind.value} {data.wind.unit}</p>
                    </li>
                    <li className={styles.item}>
                        <p className={styles.name}>Precipitation</p>
                        <p className={styles.indicate}>{data.precipitation.value} {data.precipitation.unit}</p>
                    </li>
                </ul>
            </div>
        </section>
    )
}

function StatsRowSkeleton() {
    return (
        <section className={styles.wrap}>
            <div>
                <ul className={styles.indicators}>
                    {[0, 1, 2, 3].map(i => (
                        <li key={i} className={styles.item}>
                            <div className={`${styles.skeletonLine} ${styles.skeletonName}`}></div>
                            <div className={`${styles.skeletonLine} ${styles.skeletonValue}`}></div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default StatsRow;