import React, { useState, useEffect } from "react";
import ContinentSelectionScreen from './continentSelection';
import WebAssemblyWrapper from './geoquest_wasm.js';
import WebAssemblyBinary from './geoquest_wasm.wasm';

const GameModeSelectionScreen = () => {

    const [Data, setData] = useState();

const wasmModuleInstance = WebAssemblyWrapper({
    locateFiles: ()=> {
        return WebAssemblyBinary;
    }
})

const startGame = () => {
    wasmModuleInstance.then((core)=> {
        const ptr = core._readCSV();
        console.log(ptr);
        const data = core.UTF8ToString(ptr);
        setData(data);
        console.log("updating...");
    })
}

useEffect(() => {
    if(Data) {
        const jsonData = JSON.parse(Data);
        console.log(jsonData);
        console.log("Successfully Read Data:)");
    }
}, [Data]);

    return ( 
        <header className="gameModeSelection">
            <h1 id="gameTitle">GeoQuest</h1>
            <h2 id="gameModeDirections">Select your game mode to begin!</h2>
                <div id="gameModeButtons">
                    <button id="easyModeButton" onClick={startGame}>Easy Mode</button>
                    <button id="hardModeButton" onClick={startGame}>Hard Mode</button>
                </div> 
        </header>
    );
}
 
export default GameModeSelectionScreen;









// import React, { useState, useEffect } from "react";
// import ContinentSelectionScreen from './continentSelection';

// const GameModeSelectionScreen = () => {
//     const [showContinentSelection, setShowContinentSelection] = useState(false);
//     const [gameMode, setGameMode] = useState('');
     
//     const getGameMode = (mode) => {
//         setGameMode(mode); 
//         setShowContinentSelection(true); 
//     };

//     useEffect(() => {
//         console.log(gameMode); 
//     }, [gameMode]);

//     if (showContinentSelection) {
//         return <ContinentSelectionScreen />;
//     }

//     return (
//         <header className="gameModeSelection">
//             <h1 id="gameTitle">GeoQuest</h1>
//             <h2 id="gameModeDirections">Select your game mode to begin!</h2>
//             <div id="gameModeButtons">
//                 <button id="easyModeButton" onClick={() => getGameMode("Easy")}>Easy Mode</button>
//                 <button id="hardModeButton" onClick={() => getGameMode("Hard")}>Hard Mode</button>
//             </div>
//         </header>
//     );
// };

// export default GameModeSelectionScreen;