import React, { useState, useEffect } from "react";
import WebAssemblyWrapper from './geoquest_wasm.js';
import WebAssemblyBinary from './geoquest_wasm.wasm';

const Game = () => {
    const [timeLeft, setTimeLeft] = useState(120);
    const [inputValue, setInputValue] = useState("");
    const [score, setScore] = useState(0);
    const [previousGuesses, setPreviousGuesses] = useState([]); // State to store previous guesses
    const [Stack, setStack] = useState();

    const wasmModuleInstance = WebAssemblyWrapper({
        locateFiles: () => {
            return WebAssemblyBinary;
        }
    });

    const createStack = () => {
        wasmModuleInstance.then((core) => {
            const stack = new core.JsonStack();
            setStack(stack);
            console.log("stack success!")
        });
    };

    const getSize = () => {
        const size = Stack.size();
        console.log(size);
    };

    useEffect(() => {
        createStack();
        if (Stack) {
            const stackData = JSON.parse(window.globalState.gameFilteredData);
            stackData.forEach(item => {
                const itemJson = JSON.stringify(item);  
                Stack.push(itemJson);  
                
            });
            getSize();


        }
        console.log("added to stack successfully");
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

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = () => {
        console.log("Submitted value:", inputValue);
        setPreviousGuesses(prevGuesses => [inputValue, ...prevGuesses]); // Add current input to previous guesses at the top
        setInputValue(""); // Clear input
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
