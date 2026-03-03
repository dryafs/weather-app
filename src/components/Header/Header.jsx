import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import styles from './header.module.css';
import logo from '../../images/logo.svg';
import settings from '../../images/setting.svg'
import arrow from '../../images/dropdown_arrow.svg'
import checkmark from '../../images/checkmark.svg'


function Header({ units, setUnits }) {
    const isMetric = units === "metric";
    const nextUnit = isMetric ? "imperial" : "metric";

    return (
        <header className={styles.header}>
            <div>
                <img src={logo} alt="logo" className={styles.logo} />
            </div>
            <div>
                <Menu>
                    <MenuButton className={styles.menuButton}>
                        <img src={settings} alt="setting icon" />
                        <span>Units</span>
                        <img src={arrow} alt="arrow icon" className={styles.arrow} />
                    </MenuButton>

                    <MenuItems anchor="bottom end" className={styles.list}>
                        <MenuItem>
                            <button className={styles.button} onClick={() => setUnits(nextUnit)}>
                                Switch to {isMetric ? "Imperial" : "Metric"}
                            </button>
                        </MenuItem>

                        <Section title="Temperature">
                            <Row active={isMetric}>Celsius</Row>
                            <Row active={!isMetric}>Fahrenheit</Row>
                        </Section>

                        <Divider />

                        <Section title="Wind Speed">
                            <Row active={isMetric}>km/h</Row>
                            <Row active={!isMetric}>mph</Row>
                        </Section>

                        <Divider />

                        <Section title="Precipitation">
                            <Row active={isMetric}>Millimeters(mm)</Row>
                            <Row active={!isMetric}>Inches(in)</Row>
                        </Section>
                    </MenuItems>
                </Menu>
            </div>
        </header>
    )
}

function Section({ title, children }) {
    return (
        <div>
            <p className={styles.title}>{title}</p>
            {children}
        </div>
    )
}

function Row({ active, children }) {
    return (
        <div className={`${styles.row} ${active ? styles.active : ""}`}>
            <span className={styles.item}>{children}</span>
            {active && <img src={checkmark} alt="checkmark for metric or imperic" />}
        </div>
    )
}

function Divider() {
    return <div className={styles.divider}></div>
}

export default Header;