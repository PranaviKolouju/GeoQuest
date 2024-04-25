import React, { useState } from "react";
import WebAssemblyWrapper from './geoquest_wasm.js';
import WebAssemblyBinary from './geoquest_wasm.wasm';

const GameModeSelectionScreen = () => {

    const [Game, setGame] = useState();

const wasmModuleInstance = WebAssemblyWrapper({
    locateFiles: ()=> {
        return WebAssemblyBinary;
    }
})

const startGame = () => {
    wasmModuleInstance.then((core)=> {
        const game = core._GeoQuest_new();
        console.log("Game Created");
        setGame(game);
        console.log("Successfully Set the Game!");
    })
}

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

// import React from "react";

// const GameModeSelectionScreen = () => {

//     return ( 
//         <header className="gameModeSelection">
//             <h1 id="gameTitle">GeoQuest</h1>
//             <h2 id="gameModeDirections">Select your game mode to begin!</h2>
//                 <div id="gameModeButtons">
//                     <button id="easyModeButton">Easy Mode</button>
//                     <button id="hardModeButton">Hard Mode</button>
//                 </div> 
//         </header>
//     );
// }
 
// export default GameModeSelectionScreen;