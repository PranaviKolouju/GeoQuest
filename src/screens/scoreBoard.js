import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import GameScreen from './Game.js';

const ScoreBoardScreen = () => {

    const [easyHighScores, setEasyHighScores] = useState([]);
    const [hardHighScores, setHardHighScores] = useState([]);

   const currentScore = window.globalState.gameScore;

   const defaultStorageValues = {
    '@easy_hs_northAmerica': 0,
    '@hard_hs_northAmerica': 0,
    '@easy_hs_southAmerica': 0,
    '@hard_hs_southAmerica': 0,
    '@easy_hs_africa': 0,
    '@hard_hs_africa': 0,
    '@easy_hs_europe': 0,
    '@hard_hs_europe': 0,
    '@easy_hs_asia': 0,
    '@hard_hs_asia': 0,
    '@easy_hs_oceania': 0,
    '@hard_hs_oceania': 0
  };

  const initializeAsyncStorage = async (defaultValues) => {
    try {
      await Promise.all(Object.keys(defaultValues).map(async (key) => {
        const value = await AsyncStorage.getItem(key);
        if (value === null) { // The key does not exist
          await AsyncStorage.setItem(key, defaultValues[key]);
        }
        console.log("values initialized correctly");
      }));
    } catch (e) {
      console.error("Error initializing AsyncStorage with defaults", e);
    }
  }

  const setHighScore = async (score) => {
    try {

        if (window.globalState.gameContinent === "North America") {
            if (window.globalState.gameMode === "easy") {
                if (score > await AsyncStorage.getItem('@easy_hs_northAmerica')) {
                    await AsyncStorage.setItem('@easy_hs_northAmerica', score);
                }
            }
            else {
                if (score > await AsyncStorage.getItem('@hard_hs_northAmerica')) {
                    await AsyncStorage.setItem('@hard_hs_northAmerica', score);
                }
            }
        }
        if (window.globalState.gameContinent === "South America") {
            if (window.globalState.gameMode === "easy") {
                if (score > await AsyncStorage.getItem('@easy_hs_southAmerica')) {
                    await AsyncStorage.setItem('@easy_hs_southAmerica', score);
                }
            }
            else {
                if (score > await AsyncStorage.getItem('@hard_hs_southAmerica')) {
                    await AsyncStorage.setItem('@hard_hs_southAmerica', score);
                }
            }
        }
        if (window.globalState.gameContinent === "Africa") {
            if (window.globalState.gameMode === "easy") {
                if (score > await AsyncStorage.getItem('@easy_hs_africa')) {
                    await AsyncStorage.setItem('@easy_hs_africa', score);
                }
            }
            else {
                if (score > await AsyncStorage.getItem('@hard_hs_africa')) {
                    await AsyncStorage.setItem('@hard_hs_africa', score);
                }
            }
        }
        if (window.globalState.gameContinent === "Europe") {
            if (window.globalState.gameMode === "easy") {
                if (score > await AsyncStorage.getItem('@easy_hs_europe')) {
                    await AsyncStorage.setItem('@easy_hs_europe', score);
                }
            }
            else {
                if (score > await AsyncStorage.getItem('@hard_hs_europe')) {
                    await AsyncStorage.setItem('@hard_hs_europe', score);
                }
            }
        }
        if (window.globalState.gameContinent === "Asia") {
            if (window.globalState.gameMode === "easy") {
                if (score > await AsyncStorage.getItem('@easy_hs_asia')) {
                    await AsyncStorage.setItem('@easy_hs_asia', score);
                }
            }
            else {
                if (score > await AsyncStorage.getItem('@hard_hs_asia')) {
                    await AsyncStorage.setItem('@hard_hs_asia', score);
                }
            }
        }
        if (window.globalState.gameContinent === "Oceania") {
            if (window.globalState.gameMode === "easy") {
                if (score > await AsyncStorage.getItem('@easy_hs_oceania')) {
                    await AsyncStorage.setItem('@easy_hs_oceania', score);
                }
            }
            else {
                if (score > await AsyncStorage.getItem('@hard_hs_oceania')) {
                    await AsyncStorage.setItem('@hard_hs_oceania', score);
                }
            }
        }
        console.log("high score set successfully!");
      } catch (e) {
        console.error("Can't Set High Score", e);
      }
  }

    const getHighScores = async () => {
        await Promise.all(Object.keys(defaultStorageValues).map(async (key) => {
            const value = await AsyncStorage.getItem(key);
            console.log(key + ": "+ value);
        }));
        console.log("Received high scores successfully.");
    }

    useEffect(() => {
        const initializeAndSetHighScore = async () => {
          await initializeAsyncStorage(defaultStorageValues);
          if (currentScore !== null && currentScore !== undefined) { 
            await setHighScore(currentScore);
          }
          await getHighScores();
        };

        const storeHighScores = async () => {
            const easyScores = [];
            const hardScores = [];


            const easyKeys = [
                '@easy_hs_northAmerica',
                '@easy_hs_southAmerica',
                '@easy_hs_africa',
                '@easy_hs_europe',
                '@easy_hs_asia',
                '@easy_hs_oceania'
            ]
    
            const hardKeys = [
                '@hard_hs_northAmerica',
                '@hard_hs_southAmerica',
                '@hard_hs_africa',
                '@hard_hs_europe',
                '@hard_hs_asia',
                '@hard_hs_oceania'
            ]
    
            for (let key of easyKeys) {
                const value = await AsyncStorage.getItem(key);
                easyScores.push(value);
            }

            for (let key of hardKeys) {
                const value = await AsyncStorage.getItem(key);
                hardScores.push(value);
            }

            setEasyHighScores(easyScores);
            setHardHighScores(hardScores);
        }

        const performInitialization = async () => {
            await initializeAndSetHighScore(); // Set up and potentially update high scores
            await storeHighScores(); // Fetch and store the updated high scores in state
          }
        
        performInitialization();

      }, []);


      return (
        <div style={{ margin: '10px' }}>
        <h1>High Scores</h1>
        <table style={{ width: '100%', textAlign: 'center' }}>
            <thead>
            <tr>
                <th>Continent</th>
                <th>Easy Mode</th>
                <th>Hard Mode</th>
            </tr>
            </thead>
            <tbody>
                {['North America', 'South America', 'Africa', 'Europe', 'Asia', 'Oceania'].map((continent, index) => (
                    <tr key={continent}>
                    <td>{continent}</td>
                    <td>{easyHighScores[index] || '0'}</td> {/* Fallback to '0' if undefined */}
                    <td>{hardHighScores[index] || '0'}</td> {/* Fallback to '0' if undefined */}
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );

};

export default ScoreBoardScreen;