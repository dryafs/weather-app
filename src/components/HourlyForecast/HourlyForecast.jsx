import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { useState, useMemo, useEffect } from 'react'
import { selectDailyOption, selectHourlyForDay } from '../../utils/selectors'
import { iconFromWeatherCode, labelFromWeatherCode } from '../../utils/weathericons'
import styles from './hourlyForecast.module.css'
import arrow from '../../images/dropdown_arrow.svg'


function HourlyForecast({ weather, loading }) {
    const dayOptions = useMemo(() => selectDailyOption(weather), [weather])
    const [selectedDay, setSelectedDay] = useState(null);

    useEffect(() => {
        if (!selectedDay && dayOptions.length) {
            setSelectedDay(dayOptions[0]);
        }
    }, [selectedDay, dayOptions])

    const hours = useMemo(() => {
        if (!selectedDay) return [];
        return selectHourlyForDay(weather, selectedDay.dateStr)
    }, [selectedDay, weather])

    if (loading) return <HourlyForecastSkeleton />;
    if (!weather || !selectedDay || !dayOptions) return null;

    return (
        <section className={styles.wrap}>
            <div className={styles.header}>
                <p className={styles.title}>Hourly forecast</p>
                <Listbox value={selectedDay} onChange={setSelectedDay}>
                    <ListboxButton className={styles.main_btn}>
                        <span>{selectedDay.label}</span>
                        <img src={arrow} alt="arrow icon" />
                    </ListboxButton>
                    <ListboxOptions anchor="bottom" className={styles.menu}>
                        {
                            dayOptions.map((day) => (
                                <ListboxOption key={day.dateStr} value={day} className={({ selected }) => selected ? [styles.item_menu, styles.selected].join(" ") : styles.item_menu}>
                                    {day.label}
                                </ListboxOption>
                            ))
                        }
                    </ListboxOptions>
                </Listbox>
            </div>
            <ul className={styles.list}>
                {
                    hours.map((h) => {

                        const timeLabel = new Date(h.time).toLocaleTimeString("en-US", {
                            hour: "numeric"
                        });

                        return (
                            <li className={styles.item} key={h.time}>
                                <div className={styles.timing}>
                                    <img src={iconFromWeatherCode(h.code)} className={styles.icon} alt={labelFromWeatherCode(h.code)} />
                                    <p className={styles.time}>{timeLabel}</p>
                                </div>
                                <p className={styles.temperature}>{Math.round(h.temp)}°</p>
                            </li>
                        )
                    })
                }
            </ul>
        </section>
    )
}

function HourlyForecastSkeleton() {
    return (
        <section className={styles.wrap}>
            <div className={styles.header}>
                <div className={`${styles.skeletonLine} ${styles.skeletonTitle}`}></div>
                <div className={`${styles.skeletonLine} ${styles.skeletonBtn}`}></div>
            </div>
            <ul className={styles.list}>
                {[...Array(8)].map((_, i) => (
                    <li key={i} className={`${styles.item} ${styles.itemSkeleton}`}>
                        <div className={styles.timing}>
                            <div className={`${styles.skeletonLine} ${styles.skeletonIcon}`}></div>
                            <div className={`${styles.skeletonLine} ${styles.skeletonTime}`}></div>
                        </div>
                        <div className={`${styles.skeletonLine} ${styles.skeletonTemp}`}></div>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default HourlyForecast;