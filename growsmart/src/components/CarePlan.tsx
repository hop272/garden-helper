import React, { useState, useEffect } from 'react';
import './styles/Garden.css';
import { plantData } from '../utils/plantData';
import { fetchWeather } from '../utils/weatherApi';

interface CarePlanProps {
  plantType: string;
}

const CarePlan = ({ plantType }: CarePlanProps) => {
  const [careTips, setCareTips] = useState<typeof plantData[keyof typeof plantData] | null>(null);
  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {
    // Simulate fetching weather data (replace with actual fetch)
    const mockWeather = { temp: 25 };
    setWeather(mockWeather);

    // In a real app, you'd call fetchWeather(lat, lon) here
    // Example:
    // fetchWeather(51.505, -0.09).then(data => setWeather(data));
  }, []);

  useEffect(() => {
    if (weather && plantType) {
      const updatedTips = { ...plantData[plantType as keyof typeof plantData] };
      // Adjust care tips based on weather
      if (weather.temp > 30) {
        updatedTips.watering = 'Reduce watering';
      }
      setCareTips(updatedTips);
    }
  }, [weather, plantType]);

  return (
    <div className="care-plan">
      {weather ? (
        <p>Current Temperature: {weather.temp}°C</p>
      ) : (
        <p>Loading weather data...</p>
      )}
      <h2>Care Plan for {careTips?.name || plantData[plantType as keyof typeof plantData].name}</h2>
      <ul>
        <li><strong>Water:</strong> {careTips?.watering || plantData[plantType as keyof typeof plantData].watering}</li>
        <li><strong>Sunlight:</strong> {careTips?.sunlight || plantData[plantType as keyof typeof plantData].sunlight}</li>
      </ul>
    </div>
  );
};

export default CarePlan;
