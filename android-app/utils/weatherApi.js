import axios from 'axios';

// Using Open-Meteo free API: https://open-meteo.com/
export async function fetchWeatherForCoords(lat, lon) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
    const res = await axios.get(url);
    return res.data?.current_weather || null;
  } catch (e) {
    console.warn('weather fetch error', e.message);
    return null;
  }
}
