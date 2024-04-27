import React, { useState, useEffect } from "react";
import Game from './Game';

const continents = [
  { name: 'Africa', position: { left: '50%', top: '50%' } },
  { name: 'Asia', position: { left: '67%', top: '30%' } },
  { name: 'Oceania', position: { left: '82%', top: '70%' } },
  { name: 'Europe', position: { left: '53%', top: '25%' } },
  { name: 'North America', position: { left: '13%', top: '27%' } },
  { name: 'South America', position: { left: '23%', top: '60%' } }
];

const ContinentSelectionScreen = () => {

  const [showGame, setShowGame] = useState(false);
  const [continent, setContinent] = useState('');

  const getContinent = (continent) => {
      setContinent(continent);
      setShowGame(true);
      window.globalState.gameContinent = continent;
      console.log("Game Continent set to:", window.globalState.gameContinent);
  };

  const filterData = () => {
    const filteredData = window.globalState.gameData.filter(item => item.Continent === window.globalState.gameContinent);
    console.log("Filtered Data:", filteredData);
    window.globalState.gameFilteredData = filteredData; // Set the filtered data to the global state here
    return filteredData;
  };
  
  useEffect(() => {
    if (continent) {
        window.globalState.gameContinent = continent; // Update the continent first
        const filteredData = filterData(); 
        console.log("Game Filtered Data set to:", window.globalState.gameFilteredData);
        console.log(typeof window.globalState.gameFilteredData);
    }
  }, [continent]);

  if (showGame) {
      return <Game />;
  }

  return (
    <header className="continentSelection">
      <div id="mapContainer" style={{ position: 'relative' }}>
        <img src='./images/globalMap.webp' id="worldMap" alt="World Map" style={{ width: '100%' }} />
        {continents.map((continent, index) => (
          <button
            key={index}
            className="continentButton" // Apply CSS class
            id={`continentButton${index}`}
            style={{
              left: continent.position.left,
              top: continent.position.top,
            }}
            onClick = {() => getContinent(continent.name)}
          >
            {continent.name}
          </button>
        ))}
      </div>
    </header>
  );
};

export default ContinentSelectionScreen;
