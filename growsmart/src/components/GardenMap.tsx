import React, { useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './styles/Garden.css';
import { plantData } from '../utils/plantData';

interface Plant {
  id: string;
  name: string;
  icon: string;
}

const GardenMap = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<string>('');

  // Load Leaflet icons
  L.Icon.Default.mergeIcons({
    icon: L.icon({ iconUrl: '/plant-icons/tomato.png', iconSize: [32, 32] }),
  });

  const handleAddPlant = (name: string) => {
    setPlants([...plants, { id: Date.now().toString(), name, icon: `/plant-icons/${name}.png` }]);
    setSelectedPlant(name);
  };

  return (
    <div className="garden-map-container">
      <h2>Map Your Garden</h2>
      <button onClick={() => handleAddPlant('tomato')}>Add Tomato</button>
      <button onClick={() => handleAddPlant('basil')}>Add Basil</button>

      {/* Leaflet Map */}
      <div className="leaflet-container">
        <L.Map center={[51.505, -0.09]} zoom={13}>
          <L.TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {plants.map((plant) => (
            <L.Marker key={plant.id} position={[51.5, -0.1]} icon={L.icon({ iconUrl: plant.icon })}>
              <L.Popup>I planted a {plant.name}</L.Popup>
            </L.Marker>
          ))}
        </L.Map>
      </div>

      {/* Selected Plant Info */}
      <div className="selected-plant">
        <h3>{selectedPlant ? plantData[selectedPlant as keyof typeof plantData].name : 'Select a plant'}</h3>
        <p>Water: {selectedPlant ? plantData[selectedPlant as keyof typeof plantData].watering : 'N/A'}</p>
      </div>
    </div>
  );
};

export default GardenMap;
