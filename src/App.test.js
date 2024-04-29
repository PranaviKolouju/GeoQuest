import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import GameModeSelectionScreen from './screens/gameModeSelection';
import WebAssemblyWrapper from './screens/geoquest_wasm.js';
import ScoreBoardScreen from './screens/scoreBoard';
import GeoQuestWrapper from './GeoQuestWrapper.cpp';

jest.mock('./screens/geoquest_wasm.js', () => {
  return () => Promise.resolve({
      _readCSV: jest.fn(() => 'pointer'),
      UTF8ToString: jest.fn(() => JSON.stringify({ some: 'data' }))
  });
});

jest.mock('./GeoQuestWrapper.cpp', () => {
  return {
    JsonStack: class {
      constructor() {
        this.stack = [];
      }

      push(json) {
        this.stack.push(json);
      }

      pop() {
        if (this.isEmpty()) {
          throw new Error("Stack is empty");
        }
        return this.stack.pop();
      }

      top() {
        if (this.isEmpty()) {
          throw new Error("Stack is empty");
        }
        return this.stack[this.stack.length - 1];
      }

      isEmpty() {
        return this.stack.length === 0;
      }

      size() {
        return this.stack.length;
      }
    }
  };
});


global.window.globalState = {};

describe('GameModeSelectionScreen', () => {
    test('sets the game mode correctly to "easy" when the Easy Mode button is clicked', async () => {
        const { getByText } = render(<GameModeSelectionScreen />);
        
        const easyButton = screen.getByText('Easy Mode');
        fireEvent.click(easyButton);

        await waitFor(() => expect(window.globalState.gameMode).toBe('easy'));
    });

    test('sets the game mode correctly to "hard" when the Hard Mode button is clicked', async () => {
        const { getByText } = render(<GameModeSelectionScreen />);
        
        const hardButton = screen.getByText('Hard Mode');
        fireEvent.click(hardButton);
        await waitFor(() => expect(window.globalState.gameMode).toBe('hard'));
    });
});

describe('ScoreBoardScreen', () => {
  test('shows game mode selection screen when "Play Again" button is clicked', async () => {
      const { getByText } = render(<ScoreBoardScreen />);
      fireEvent.click(screen.getByText('Play Again'));
      expect(window.location.href).toBe('http://localhost/');
  });

  test('closes the window when "Quit" button is clicked', async () => {
      delete window.close;
      window.close = jest.fn();
      const { getByText } = render(<ScoreBoardScreen />);
      fireEvent.click(screen.getByText('Quit'));
      expect(window.close).toHaveBeenCalled();
  });
});

const { JsonStack } = require('./GeoQuestWrapper.cpp');

describe('JsonStack', () => {
    let stack;

    beforeEach(() => {
        stack = new JsonStack();
    });

    test('should start empty', () => {
        expect(stack.isEmpty()).toBe(true);
    });

    test('should push items to the stack', () => {
        stack.push('{"name":"John"}');
        expect(stack.size()).toBe(1);
        expect(stack.isEmpty()).toBe(false);
    });

    test('should pop the last item pushed', () => {
        stack.push('{"name":"John"}');
        stack.push('{"name":"Doe"}');
        expect(stack.pop()).toBe('{"name":"Doe"}');
        expect(stack.size()).toBe(1);
    });

    test('should allow peeking at the top item without popping it', () => {
        stack.push('{"name":"John"}');
        expect(stack.top()).toBe('{"name":"John"}');
        expect(stack.size()).toBe(1);
    });

    test('should throw when popping from an empty stack', () => {
        expect(() => stack.pop()).toThrow("Stack is empty");
    });

    test('should throw when accessing the top of an empty stack', () => {
        expect(() => stack.top()).toThrow("Stack is empty");
    });
});
