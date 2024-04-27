import React, { useState, useEffect } from "react";
import WebAssemblyWrapper from './geoquest_wasm.js';
import WebAssemblyBinary from './geoquest_wasm.wasm';

const Game = () => {
    const [timeLeft, setTimeLeft] = useState(120);
    const [inputValue, setInputValue] = useState("");
    const [score, setScore] = useState(0);
    const [previousGuesses, setPreviousGuesses] = useState([]);
    const [stack, setStack] = useState(null);
    const [currentCountry, setCurrentCountry] = useState(null);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
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

            const stackData = window.globalState.gameFilteredData;
            shuffleArray(stackData);
            stackData.forEach(item => {
                const itemJson = JSON.stringify(item);
                stackInstance.push(itemJson);
            });

            setStack(stackInstance);
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

        return () => clearInterval(timerInterval);
    }, []);

    useEffect(() => {
        if (stack && !currentCountry) {
            popAndDisplayNextCountry();
        }
    }, [stack]);

    const popAndDisplayNextCountry = () => {
        if (stack && stack.size() > 0) {
            const countryJson = stack.pop();
            const countryData = JSON.parse(countryJson);
            setCurrentCountry(countryData);
            console.log(countryData.Country);
        } else {
            console.log("Stack is empty, no more countries to display.");
            setCurrentCountry(null);
        }
    };

    const handleSubmit = () => {
        if (inputValue.trim() === "") {
            console.log("Empty input, not accepted.");
            return;
        }

        const guess = inputValue.trim();
        setPreviousGuesses([guess.toUpperCase(), ...previousGuesses]); // Add guess in uppercase to previous guesses

        if (currentCountry && guess.toLowerCase() === currentCountry.Country_Lower) {
            setScore(score + 1);
            popAndDisplayNextCountry();
        } else {
            console.log("Wrong guess.");
        }

        setInputValue(""); 
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSubmit();
        }
    };

    const getImagePath = (country) => {
        return country && window.globalState.gameMode === "easy" ? country['Easy Image Path'] : country['Image Path'];
    };

    return (
        <div className="gameContainer">
            {currentCountry && (
                <div className="imageContainer">
                    <img src={getImagePath(currentCountry)} alt="Country" />
                </div>
            )}
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
                <h4>PREVIOUS GUESSES</h4>
                {previousGuesses.map((guess, index) => (
                    <div key={index}>{guess}</div>
                ))}
            </div>
        </div>
    );
};

export default Game;
