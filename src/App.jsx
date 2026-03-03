import { useState, useEffect } from "react";
import { geocodeCity, fetchForecast } from "./api/openMeteo";

import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import CurrentCard from "./components/CurrentCard/CurrentCard";
import StatsRow from "./components/StatsRow/StatsRow";
import HourlyForecast from "./components/HourlyForecast/HourlyForecast";
import DailyForecast from "./components/DailyForecast/DailyForecast";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import styles from './app.module.css'

function App() {
  const [weather, setWeather] = useState(null);
  const [place, setPlace] = useState(null)
  const [units, setUnits] = useState(() => localStorage.getItem("units") || "metric");
  const [error, setError] = useState(false);
  const [notFound, setNotFound] = useState(false)
  const [loading, setLoading] = useState(true);

  const loadCity = async (cityName) => {
    try {
      setLoading(true);
      const place = await geocodeCity(cityName, { count: 1, language: "en" });
      if (!place) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      setPlace(place);

      const weather = await fetchForecast({
        latitude: place.latitude,
        longitude: place.longitude,
        units: units
      })
      if (!weather) return;
      setWeather(weather);
      setError(false);
      setNotFound(false);
      localStorage.setItem("lastCity", cityName);

    } catch (e) {
      setError(true)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const savedCity = localStorage.getItem("lastCity") || "Dublin";
    loadCity(savedCity);
  }, [])

  useEffect(() => {
    if (!place) {
      setNotFound(true);
      return
    }

    (async () => {
      try {
        setLoading(true);
        const weather = await fetchForecast({
          latitude: place.latitude,
          longitude: place.longitude,
          units: units
        })
        setWeather(weather);
        setError(false);
        setNotFound(false);
        localStorage.setItem("units", units);
      } catch (e) {
        setError(true)
      } finally {
        setLoading(false);
      }
    })();
  }, [units])

  const onHandleSubmit = async (cityName) => {
    await loadCity(cityName);
  }

  return <View
    onHandleSubmit={onHandleSubmit}
    weather={weather}
    setUnits={setUnits}
    units={units}
    place={place}
    error={error}
    notFound={notFound}
    loading={loading} />
}

const View = ({ onHandleSubmit, weather, setUnits, units, place, error, notFound, loading }) => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Header units={units} setUnits={setUnits} />

        <main className={styles.main}>
          {!error ? (
            <>
              <section className={styles.hero}>
                <h1 className={styles.title}>How's the sky looking today?</h1>
                <SearchBar onSubmitCity={onHandleSubmit} />
                {notFound && !loading && (
                  <p className={styles.notFound}>City not found. Please try a different name.</p>
                )}
              </section>

              {!notFound && (
                <section className={styles.forecast}>
                  <div className={styles.left}>
                    <CurrentCard weather={weather} place={place} loading={loading} />
                    <StatsRow weather={weather} loading={loading} />
                    <DailyForecast weather={weather} loading={loading} />
                  </div>

                  <div className={styles.right}>
                    <HourlyForecast weather={weather} loading={loading} />
                  </div>
                </section>
              )}
            </>
          ) : (
            <section className={styles.errorSection}>
              <ErrorMessage />
            </section>
          )}
        </main>
      </div>
    </div>
  )
}

export default App;
