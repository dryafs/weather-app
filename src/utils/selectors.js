
export function selectCurrent(weather){
    const c = weather?.current;
    if(!c) return;

    return{
        temp: c.temperature_2m,
        time: c.time,
        code: c.weather_code
    }
}

export function selectStats(weather){
    const c = weather?.current;
    if(!c) return;
    
    return {
        feelsLike: {
            value: c.apparent_temperature,
            unit: weather.current_units?.apparent_temperature || "°C",
        },
        humidity: {
            value: c.relative_humidity_2m,
            unit: weather.current_units?.relative_humidity_2m || "%",
        },
        wind: {
            value: c.wind_speed_10m,
            unit: weather.current_units?.wind_speed_10m || "km/h",
        },
        precipitation: {
            value: c.precipitation,
            unit: weather.current_units?.precipitation || "mm",
        },
    };
}

export function selectDaily(weather){
    const d = weather?.daily;
    if(!d?.time?.length) return [];

    return d.time.map((date, i) => ({
        date,
        code: d.weather_code?.[i],
        max: d.temperature_2m_max?.[i],
        min: d.temperature_2m_min?.[i],
    }));
}

export function selectDailyOption(weather){
    const d = weather?.daily;
    if(!d?.time?.length) return [];



    return d.time.map((dateStr) => ({
        dateStr,
        label: new Date(dateStr).toLocaleDateString("en-GB", {weekday: "long"})
    }))
}

export function selectHourlyForDay(weather, dateStr){
    const h = weather?.hourly;
    if(!h?.time?.length) return [];

    const indices = [];
    for(let i = 0; i < h.time.length; i++){
        if(h.time[i].startsWith(dateStr)) indices.push(i);
    }

    return indices.map((i) => ({
        time: h.time[i],
        temp: h.temperature_2m?.[i],
        code: h.weather_code?.[i]
    }))
}