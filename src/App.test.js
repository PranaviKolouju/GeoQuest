import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import GameModeSelectionScreen from './screens/gameModeSelection';
import WebAssemblyWrapper from './screens/geoquest_wasm.js';

jest.mock('./screens/geoquest_wasm.js', () => {
  return () => Promise.resolve({
      _readCSV: jest.fn(() => 'pointer'),
      UTF8ToString: jest.fn(() => JSON.stringify({ some: 'data' }))
  });
});

global.window.globalState = {};

describe('GameModeSelectionScreen', () => {
    test('sets the game mode correctly to "easy" when the Easy Mode button is clicked', async () => {
        const { getByText } = render(<GameModeSelectionScreen />);
        
        const easyButton = getByText('Easy Mode');
        fireEvent.click(easyButton);

        await waitFor(() => expect(window.globalState.gameMode).toBe('easy'));
    });

    test('sets the game mode correctly to "hard" when the Hard Mode button is clicked', async () => {
        const { getByText } = render(<GameModeSelectionScreen />);
        
        const hardButton = getByText('Hard Mode');
        fireEvent.click(hardButton);
        await waitFor(() => expect(window.globalState.gameMode).toBe('hard'));
    });
});
