import React, { useState, useEffect } from "react";
import WebAssemblyWrapper from './geoquest_wasm.js';
import WebAssemblyBinary from './geoquest_wasm.wasm';

const Game = () => {
    const [timeLeft, setTimeLeft] = useState(120);
    const [inputValue, setInputValue] = useState("");
    const [score, setScore] = useState(0);
    const [previousGuesses, setPreviousGuesses] = useState([]);
    const [stack, setStack] = useState(null);

    useEffect(() => {
        const initWasm = async () => {
            const wasmModuleInstance = WebAssemblyWrapper({
                locateFiles: () => {
                    return WebAssemblyBinary;
                }
            });

            const core = await wasmModuleInstance;
            const stackInstance = new core.JsonStack();
            setStack(stackInstance);
            console.log("Stack initialized successfully!");

            // Load data into stack after initialization
            const stackData = window.globalState.gameFilteredData;
            stackData.forEach(item => {
                const itemJson = JSON.stringify(item);
                stackInstance.push(itemJson);
            });

            // Log stack size after data is loaded
            console.log("Stack size:", stackInstance.size());
        };

        initWasm();

        const timerInterval = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timerInterval);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        // Cleanup on component unmount
        return () => clearInterval(timerInterval);
    }, []);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = () => {
        console.log("Submitted value:", inputValue);
        setPreviousGuesses(prevGuesses => [inputValue, ...prevGuesses]);
        setInputValue(""); // Clear input field after submission
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSubmit();
        }
    };

    return (
        <div className="gameContainer">
            <div className="timerBox">
                {timeLeft} seconds
            </div>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="textInput"
            />
            <button onClick={handleSubmit} className="submitButton">
                Submit
            </button>
            <div className="scoreBox">
                Score: {score}
            </div>
            <div className="previousGuessesBox">
                <h4>Previous Guesses</h4>
                {previousGuesses.map((guess, index) => (
                    <div key={index}>{guess}</div>
                ))}
            </div>
        </div>
    );
};

export default Game;
