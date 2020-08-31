import React from 'react';
import logo from './logo.svg';
import './App.css';
import DropDown from './DropDown.jsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Nu Order Challenge</h1>
        <DropDown textSizeMin="3" />
      </header>
    </div>
  );
}

export default App;
