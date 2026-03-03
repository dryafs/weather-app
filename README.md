# 🌤 Weather App

A clean, responsive weather application built with React and Vite, powered by the free [Open-Meteo API](https://open-meteo.com/).

![Weather App Preview](./public/preview.png)

## Features

- 🔍 **City search** with real-time autocomplete suggestions
- 📍 **Geolocation-aware** — suggestions sorted by proximity to your location
- 🌡 **Current weather** — temperature, weather condition, location & date
- 📊 **Stats row** — feels like, humidity, wind speed, precipitation
- 📅 **7-day daily forecast**
- ⏱ **Hourly forecast** with per-day selector
- 🔄 **Unit toggle** — Metric (°C, km/h, mm) ↔ Imperial (°F, mph, in)
- 💾 **Persistent** — remembers your last city and unit preference via `localStorage`
- 💀 **Skeleton loading** states for all components
- 📱 **Fully responsive** — works on desktop, tablet and mobile

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [React 18](https://react.dev/) + [Vite](https://vite.dev/) |
| UI Components | [Headless UI](https://headlessui.com/) |
| Styling | CSS Modules |
| API | [Open-Meteo](https://open-meteo.com/) (no API key required) |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── api/
│   └── openMeteo.js        # Geocoding + forecast API calls
├── components/
│   ├── CurrentCard/        # Current weather card
│   ├── DailyForecast/      # 7-day forecast
│   ├── ErrorMessage/       # Error state
│   ├── Header/             # Units toggle menu
│   ├── HourlyForecast/     # Hourly forecast with day picker
│   ├── SearchBar/          # Search with autocomplete
│   └── StatsRow/           # Weather statistics
├── utils/
│   ├── selectors.js        # Data selectors from API response
│   └── weathericons.js     # Weather code → icon/label mapping
└── App.jsx                 # Root app + state management
```
