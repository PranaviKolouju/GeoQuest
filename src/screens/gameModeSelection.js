import React, { useState, useEffect } from "react";
import ContinentSelectionScreen from './continentSelection';
import WebAssemblyWrapper from './geoquest_wasm.js';
import WebAssemblyBinary from './geoquest_wasm.wasm';

const GameModeSelectionScreen = () => {
    const [showContinentSelection, setShowContinentSelection] = useState(false);
    const [Data, setData] = useState();

    const wasmModuleInstance = WebAssemblyWrapper({
        locateFiles: () => {
            return WebAssemblyBinary;
        }
    });

    const startGame = (mode) => {
        wasmModuleInstance.then((core) => {
            const ptr = core._readCSV();
            console.log(ptr);
            const data = core.UTF8ToString(ptr);
            setData(data);
            console.log("updating...");
            window.globalState.gameMode = mode; 
            console.log("Game mode set to:", window.globalState.gameMode);
        });
    };

    useEffect(() => {
        if (Data) {
            const jsonData = JSON.parse(Data);
            window.globalState.gameData = jsonData; 
            console.log("Game data set to:", window.globalState.gameData);
            console.log("Successfully Read Data:)");
            setShowContinentSelection(true);
        }
    }, [Data]);

    if (showContinentSelection) {
        return <ContinentSelectionScreen />;
    }

    return (
        <header className="gameModeSelection">
            <h1 id="gameTitle">GeoQuest</h1>
            <h2 id="gameModeDirections">Select your game mode to begin!</h2>
            <div id="gameModeButtons">
                <button id="easyModeButton" onClick={() => startGame("easy")}>Easy Mode</button>
                <button id="hardModeButton" onClick={() => startGame("hard")}>Hard Mode</button>
            </div> 
        </header>
    );
};

export default GameModeSelectionScreen;