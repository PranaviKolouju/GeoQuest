import React, { useState, useEffect } from "react";
import Game from './Game';

const continents = [
  { name: 'Africa', position: { left: '50%', top: '45%' } },
  { name: 'Asia', position: { left: '75%', top: '20%' } },
  { name: 'Oceania', position: { left: '94%', top: '73%' } },
  { name: 'Europe', position: { left: '56%', top: '13%' } },
  { name: 'North America', position: { left: '6%', top: '18%' } },
  { name: 'South America', position: { left: '19%', top: '60%' } }
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
      return filteredData;
  };

  useEffect(() => {
      if (continent) {
          filterData(); 
          window.globalState.gameContinent = continent;
          console.log("Game Filtered Data set to:", window.globalState.gameFilteredData);
      }
  }, [continent]);

  if (showGame) {
      return <Game />;
  }

  return (
    <header className="continentSelection">
      <h2 id="continentSelectionCaption">Choose a Continent!</h2>
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
