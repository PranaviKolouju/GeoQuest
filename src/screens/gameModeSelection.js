import React, { useState, useEffect } from "react";
import ContinentSelectionScreen from './continentSelection';

const GameModeSelectionScreen = () => {
    const [showContinentSelection, setShowContinentSelection] = useState(false);
    const [gameMode, setGameMode] = useState('');
     
    const getGameMode = (mode) => {
        setGameMode(mode); 
        setShowContinentSelection(true); 
    };

    useEffect(() => {
        console.log(gameMode); 
    }, [gameMode]);

    if (showContinentSelection) {
        return <ContinentSelectionScreen />;
    }

    return (
        <header className="gameModeSelection">
            <h1 id="gameTitle">GeoQuest</h1>
            <h2 id="gameModeDirections">Select your game mode to begin!</h2>
            <div id="gameModeButtons">
                <button id="easyModeButton" onClick={() => getGameMode("Easy")}>Easy Mode</button>
                <button id="hardModeButton" onClick={() => getGameMode("Hard")}>Hard Mode</button>
            </div>
        </header>
    );
};

export default GameModeSelectionScreen;