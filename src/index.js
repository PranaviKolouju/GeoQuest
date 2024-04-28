import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals'

window.globalState = {
  gameMode: "",
  gameData: "",
  gameContinent: "",
  gameFilteredData: "",
  gameScore: ""
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

reportWebVitals();
