import { useState, useEffect, useRef } from 'react';
import { geocodeSuggestions } from '../../api/openMeteo';
import styles from './searchBar.module.css';

function SearchBar({ onSubmitCity }) {
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [open, setOpen] = useState(false);
    const [userCoords, setUserCoords] = useState(null);
    const debounceRef = useRef(null);
    const wrapRef = useRef(null);

    useEffect(() => {
        if (!navigator.geolocation) return;
        navigator.geolocation.getCurrentPosition(
            (pos) => setUserCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
            () => { }
        );
    }, []);

    useEffect(() => {
        clearTimeout(debounceRef.current);
        if (value.trim().length < 2) {
            setSuggestions([]);
            setOpen(false);
            return;
        }
        debounceRef.current = setTimeout(async () => {
            const results = await geocodeSuggestions(value, { userCoords });
            setSuggestions(results);
            setOpen(results.length > 0);
            setActiveIndex(-1);
        }, 300);
        return () => clearTimeout(debounceRef.current);
    }, [value, userCoords]);

    useEffect(() => {
        const handleClick = (e) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const selectSuggestion = (suggestion) => {
        setValue('');
        setSuggestions([]);
        setOpen(false);
        setActiveIndex(-1);
        onSubmitCity(suggestion.name);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const city = value.trim();
        if (!city) return;
        if (activeIndex >= 0 && suggestions[activeIndex]) {
            selectSuggestion(suggestions[activeIndex]);
        } else {
            setValue('');
            setSuggestions([]);
            setOpen(false);
            onSubmitCity(city);
        }
    };

    const onKeyDown = (e) => {
        if (!open) return;
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex(i => Math.min(i + 1, suggestions.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex(i => Math.max(i - 1, -1));
        } else if (e.key === 'Escape') {
            setOpen(false);
            setActiveIndex(-1);
        }
    };

    return (
        <div ref={wrapRef} className={styles.wrap}>
            <form onSubmit={onSubmit} className={styles.form}>
                <input
                    type="text"
                    placeholder="Search for a place..."
                    autoComplete="off"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={onKeyDown}
                    onFocus={() => suggestions.length > 0 && setOpen(true)}
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>
                    Search
                </button>
            </form>

            {open && (
                <ul className={styles.dropdown}>
                    {suggestions.map((s, i) => (
                        <li
                            key={s.id}
                            className={`${styles.dropdownItem} ${i === activeIndex ? styles.dropdownItemActive : ''}`}
                            onMouseDown={() => selectSuggestion(s)}
                            onMouseEnter={() => setActiveIndex(i)}
                        >
                            <span className={styles.cityName}>{s.name}</span>
                            <span className={styles.cityMeta}>
                                {s.admin ? `${s.admin}, ` : ''}{s.country}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchBar;