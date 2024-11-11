import React from 'react';
import LexicalEditor from './LexicalEditor';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My Note-Taking App</h1>
      </header>
      <main>
        <LexicalEditor />
      </main>
    </div>
  );
};

export default App;
