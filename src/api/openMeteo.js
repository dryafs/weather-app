const GEO_BASE = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_BASE = "https://api.open-meteo.com/v1/forecast";

function mapUnits(units) {
    if (units === "imperial") {
        return {
            temperature_unit: "fahrenheit",
            wind_speed_unit: "mph",
            precipitation_unit: "inch"
        }
    }
    return {
        temperature_unit: "celsius",
        wind_speed_unit: "kmh",
        precipitation_unit: "mm"
    }
}


export async function geocodeCity(name, { count = 1, language = "en" } = {}) {
    const url = `${GEO_BASE}?name=${encodeURIComponent(name)}` +
        `&count=${count}&language=${language}&format=json`

    const res = await fetch(url);
    if (!res.ok) throw new Error("Geocoding failed");
    const data = await res.json();

    const geocode = data?.results?.[0];
    if (!geocode) return null;

    return {
        name: geocode.name,
        country: geocode.country,
        latitude: geocode.latitude,
        longitude: geocode.longitude,
        timezone: geocode.timezone
    }
}

function haversineKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export async function geocodeSuggestions(name, { count = 3, language = "en", userCoords = null } = {}) {
    if (!name || name.trim().length < 2) return [];

    const fetchCount = userCoords ? 10 : count;
    const url = `${GEO_BASE}?name=${encodeURIComponent(name)}` +
        `&count=${fetchCount}&language=${language}&format=json`;

    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();

    let results = (data?.results ?? []).map(g => ({
        id: `${g.latitude},${g.longitude}`,
        name: g.name,
        admin: g.admin1 ?? null,
        country: g.country,
        latitude: g.latitude,
        longitude: g.longitude,
        timezone: g.timezone
    }));

    if (userCoords) {
        results.sort((a, b) =>
            haversineKm(userCoords.lat, userCoords.lon, a.latitude, a.longitude) -
            haversineKm(userCoords.lat, userCoords.lon, b.latitude, b.longitude)
        );
    }

    return results.slice(0, count);
}

export async function fetchForecast({ latitude, longitude, units = "metric" }) {
    const { temperature_unit, wind_speed_unit, precipitation_unit } = mapUnits(units);


    const params = new URLSearchParams({
        latitude: String(latitude),
        longitude: String(longitude),
        timezone: "auto",

        temperature_unit,
        wind_speed_unit,
        precipitation_unit,

        current:
            "temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m",

        daily:
            "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum",

        hourly:
            "temperature_2m,weather_code,precipitation,wind_speed_10m",

        forecast_days: "7"
    });

    const url = `${FORECAST_BASE}?${params.toString()}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("Forecast request failed");

    return res.json();

}