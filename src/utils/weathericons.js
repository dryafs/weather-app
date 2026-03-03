import sun from '../images/sun.svg'
import partly from '../images/partly_cloudly.svg'
import cloud from '../images/overcast.svg'
import fog from '../images/fog.svg'
import drizzle from '../images/heavy_rain.svg'
import rain from '../images/rain.svg'
import snow from '../images/snow.svg'
import thunder from '../images/thunderstorms.svg'

export const iconFromWeatherCode = (code) => {
    if(code === 0) return sun;
    if(code === 1 || code === 2) return partly;
    if(code === 3) return cloud;
    if(code === 45 || code === 48) return fog;
    if([51, 53, 55, 56, 57].includes(code)) return drizzle;
    if([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return rain;
    if([71, 73, 75, 77, 85, 86].includes(code)) return snow;
    if([95, 96, 99].includes(code)) return thunder;

    return cloud;
}

export const labelFromWeatherCode = (code) => {
    if(code === 0) return "Clear sky";
    if(code === 1 || code === 2) return "Mainly clear";
    if(code === 3) return "Partly cloudy";
    if(code === 45 || code === 48) return "Fog";
    if([51, 53, 55, 56, 57].includes(code)) return "Drizzle";
    if([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "Rain";
    if([71, 73, 75, 77, 85, 86].includes(code)) return "Snow";
    if([95, 96, 99].includes(code)) return "Thunderstorms";

    return "weather";
}