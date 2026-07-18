import React from 'react';
import GardenMap from './components/GardenMap';
import CarePlan from './components/CarePlan';

function App() {
  return (
    <div className="app">
      <GardenMap />
      <CarePlan plantType="tomato" />
    </div>
  );
}

export default App;
