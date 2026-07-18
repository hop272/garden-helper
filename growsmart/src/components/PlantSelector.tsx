import React, { useState } from 'react';
import './styles/Garden.css';
import { plantData } from '../utils/plantData';

interface Plant {
  name: string;
}

const PlantSelector = () => {
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const plants = [
    { name: "Tomato" },
    { name: "Basil" },
    { name: "Grass" }
  ];

  return (
    <div className="plant-selector">
      <h3>Select Your Plant</h3>
      <select
        value={selectedPlant?.name || ''}
        onChange={(e) => setSelectedPlant({ name: e.target.value })}
      >
        {plants.map((plant) => (
          <option key={plant.name} value={plant.name}>{plant.name}</option>
        ))}
      </select>

      {selectedPlant && (
        <div className="care-tips">
          <h4>Care Tips for {selectedPlant.name}</h4>
          <p>Water: {plantData[selectedPlant.name as keyof typeof plantData].watering}</p>
          <p>Sunlight: {plantData[selectedPlant.name as keyof typeof plantData].sunlight}</p>
        </div>
      )}
    </div>
  );
};

export default PlantSelector;
