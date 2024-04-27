import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import GameScreen from './Game.js';
import { NULL } from "mysql/lib/protocol/constants/types.js";

const ScoreBoardScreen = () => {
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
                if (score > AsyncStorage.getItem('@easy_hs_northAmerica')) {
                    AsyncStorage.setItem('@easy_hs_northAmerica', score);
                }
            }
            else {
                if (score > AsyncStorage.getItem('@hard_hs_northAmerica')) {
                    AsyncStorage.setItem('@hard_hs_northAmerica', score);
                }
            }
        }
        if (window.globalState.gameContinent === "South America") {
            if (window.globalState.gameMode === "easy") {
                if (score > AsyncStorage.getItem('@easy_hs_southAmerica')) {
                    AsyncStorage.setItem('@easy_hs_southAmerica', score);
                }
            }
            else {
                if (score > AsyncStorage.getItem('@hard_hs_southAmerica')) {
                    AsyncStorage.setItem('@hard_hs_southAmerica', score);
                }
            }
        }
        if (window.globalState.gameContinent === "Africa") {
            if (window.globalState.gameMode === "easy") {
                if (score > AsyncStorage.getItem('@easy_hs_africa')) {
                    AsyncStorage.setItem('@easy_hs_africa', score);
                }
            }
            else {
                if (score > AsyncStorage.getItem('@hard_hs_africa')) {
                    AsyncStorage.setItem('@hard_hs_africa', score);
                }
            }
        }
        if (window.globalState.gameContinent === "Europe") {
            if (window.globalState.gameMode === "easy") {
                if (score > AsyncStorage.getItem('@easy_hs_europe')) {
                    AsyncStorage.setItem('@easy_hs_europe', score);
                }
            }
            else {
                if (score > AsyncStorage.getItem('@hard_hs_europe')) {
                    AsyncStorage.setItem('@hard_hs_europe', score);
                }
            }
        }
        if (window.globalState.gameContinent === "Asia") {
            if (window.globalState.gameMode === "easy") {
                if (score > AsyncStorage.getItem('@easy_hs_asia')) {
                    AsyncStorage.setItem('@easy_hs_asia', score);
                }
            }
            else {
                if (score > AsyncStorage.getItem('@hard_hs_asia')) {
                    AsyncStorage.setItem('@hard_hs_asia', score);
                }
            }
        }
        if (window.globalState.gameContinent === "Oceania") {
            if (window.globalState.gameMode === "easy") {
                if (score > AsyncStorage.getItem('@easy_hs_oceania')) {
                    AsyncStorage.setItem('@easy_hs_oceania', score);
                }
            }
            else {
                if (score > AsyncStorage.getItem('@hard_hs_oceania')) {
                    AsyncStorage.setItem('@hard_hs_oceania', score);
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
        initializeAsyncStorage(defaultStorageValues);
        setHighScore(currentScore);
        getHighScores();
    })

};

export default ScoreBoardScreen;