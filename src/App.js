import React from 'react';
import logo from './logo.png';
import './App.css';
import Connect4 from './components/Connect4';

function App() {
  const [connect4Winner, setConnect4Winner] = React.useState(null);
  const [connect4Finished, setConnect4Finished] = React.useState(false);
  const connect4Ref = React.useRef(null);

  const handleConnect4GameFinish = React.useCallback((winner) => {
    setConnect4Winner(winner);
    setConnect4Finished(true);
  }, []);

  const handlePlayAgainButtonClick = React.useCallback(() => {
    connect4Ref.current.reset();
    setConnect4Winner(null);
    setConnect4Finished(false);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Connect Four</h1>
      </header>
      <Connect4
        ref={connect4Ref}
        numRows={6}
        numCols={7}
        onGameFinish={handleConnect4GameFinish}
      />
      {connect4Winner && (
        <div>Player {connect4Winner} has won! Congratulations!</div>
      )}
      {connect4Finished && !connect4Winner && (
        <div>The game has finished without any winner :(</div>
      )}
      <br />
      {connect4Finished && (
        <button onClick={handlePlayAgainButtonClick}>Play again!</button>
      )}
    </div>
  );
}

export default App;
