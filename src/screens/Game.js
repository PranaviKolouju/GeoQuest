import React, { useState, useEffect } from "react";
import WebAssemblyWrapper from './geoquest_wasm.js';
import WebAssemblyBinary from './geoquest_wasm.wasm';

const Game = () => {
    const [timeLeft, setTimeLeft] = useState(120);
    const [inputValue, setInputValue] = useState("");
    const [score, setScore] = useState(0);
    const [previousGuesses, setPreviousGuesses] = useState([]);
    const [stack, setStack] = useState(null);

    // Function to shuffle an array
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
    };

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

            // Load and shuffle data into stack after initialization
            const stackData = window.globalState.gameFilteredData;
            shuffleArray(stackData);  // Shuffle the data randomly
            stackData.forEach(item => {
                const itemJson = JSON.stringify(item);
                stackInstance.push(itemJson);
            });

            // Log stack size after data is loaded
            console.log("Stack size:", stackInstance.size());

            const currentCountry = JSON.parse(stackInstance.pop());
            console.log("Current Country: ", currentCountry.Country_Lower);
            console.log("Current Country: ", currentCountry.latitude);
            console.log("Current Country: ", currentCountry.longitude);

            console.log("Stack size:", stackInstance.size());

            const nextCountry = JSON.parse(stackInstance.pop());
            console.log("Next Country: ", nextCountry.Country_Lower);
            console.log("Next Country: ", nextCountry.latitude);
            console.log("Next Country: ", nextCountry.longitude);
            
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
