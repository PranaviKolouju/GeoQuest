import React, { useState, useEffect } from "react";

const Game = () => {
    const [timeLeft, setTimeLeft] = useState(120);
    const [inputValue, setInputValue] = useState("");
    const [score, setScore] = useState(0);
    const [previousGuesses, setPreviousGuesses] = useState([]); // State to store previous guesses

    useEffect(() => {
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
