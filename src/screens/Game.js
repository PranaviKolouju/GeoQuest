import React, { useState, useEffect } from "react";
import WebAssemblyWrapper from './geoquest_wasm.js';
import WebAssemblyBinary from './geoquest_wasm.wasm';
import ScoreBoardScreen from './scoreBoard.js';

const GameScreen = () => {
    const [timeLeft, setTimeLeft] = useState(120);
    const [inputValue, setInputValue] = useState("");
    const [score, setScore] = useState(0);
    const [previousGuesses, setPreviousGuesses] = useState([]);
    const [stack, setStack] = useState(null);
    const [currentCountry, setCurrentCountry] = useState(null);
    const [hint, setHint] = useState("");
    const [showScoreBoard, setShowScoreBoard] = useState(false);
    const [remainingCountries, setRemainingCountries] = useState(null);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    const generateHint = (guess) => {
        let hintMessage = ""; 
        if (currentCountry) { 
            window.globalState.gameFilteredData.forEach(item => {
                if (item.Country_Lower === guess.toLowerCase()) {
                    if (parseFloat(item.latitude) < parseFloat(currentCountry.latitude)) {
                        hintMessage += "The correct country is further North";
                    }
                    if (parseFloat(item.latitude) > parseFloat(currentCountry.latitude)) {
                        hintMessage += "The correct country is further South";
                    }
                    if (parseFloat(item.longitude) < parseFloat(currentCountry.longitude)) { 
                        hintMessage += " and East.";
                    }
                    if (parseFloat(item.longitude) > parseFloat(currentCountry.longitude)) {
                        hintMessage += " and West.";
                    }
                }
            });
    
            if (hintMessage === "") {
                hintMessage = "Not a valid country in " + window.globalState.gameContinent;
            }
        } else {
            hintMessage = "Please start the game to get hints.";
        }
    
        setHint(hintMessage);
        return hintMessage; 
    }

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
    
        const guess = inputValue.trim().toLowerCase();
        const isValidCountry = window.globalState.gameFilteredData.some(item => item.Country_Lower === guess);
        
        if (isValidCountry) {
            setPreviousGuesses([guess.toUpperCase(), ...previousGuesses]);
        }
    
        if (currentCountry && guess === currentCountry.Country_Lower) {
            setScore(score + 10);
            setTimeLeft(timeLeft + 5);
            setHint("");
            setRemainingCountries(remainingCountries-1);
            if (stack.isEmpty()) {
                setShowScoreBoard(true);
            }
            popAndDisplayNextCountry();
            setPreviousGuesses([]);
        } else {
            setTimeLeft(timeLeft - 10);
            console.log("Wrong guess.");
            const newHint = generateHint(guess);
            if (isValidCountry) {
                console.log(newHint);
                setHint(newHint);
            }
        }
    
        setInputValue("");
    };

    useEffect(() => {
        const updateRemainingCountries = async () => {
            if (stack) {
                const remaining = await stack.size()+1;
                setRemainingCountries(remaining);
            }
        };
        updateRemainingCountries();
    }, [stack]);
    

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

    const storeScore = () => {
        window.globalState.gameScore = score;
    };

    if (showScoreBoard || timeLeft <= 0) {
        storeScore();
        return <ScoreBoardScreen />;
    }

    return (
        <div className="gameContainer">
            <div className="remainingBox">
                    Remaining Countries: {remainingCountries}
            </div>
            <div className="leftColumn">
                {currentCountry && (
                    <div className="imageContainer">
                        <img src={getImagePath(currentCountry)} alt="Country" />
                    </div>
                )}
                <div className="inputSubmitContainer">
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
                </div>
                <div className="scoreBox">
                    Score: {score}
                </div>
            </div>
            <div className="rightColumn">
                <div className="timerBox">
                    {timeLeft} seconds
                </div>
                <div className="hintBox">
                    <h4>HINT</h4>
                    {hint && <div>{hint}</div>}
                </div>
                <div className="previousGuessesBox">
                    <h4>PREVIOUS GUESSES</h4>
                    {previousGuesses.map((guess, index) => (
                        <div key={index}>{guess}</div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default GameScreen;
