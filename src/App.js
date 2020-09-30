import React from 'react';
import logo from './logo.png';
import './App.css';
import Connect4 from './components/Connect4';
import { PLAYER1 } from './lib/connect-4';

function App() {
  const [connect4Winner, setConnect4Winner] = React.useState(null);
  const [connect4Finished, setConnect4Finished] = React.useState(false);
  const [currentPlayer, setCurrentPlayer] = React.useState(PLAYER1);
  const connect4Ref = React.useRef(null);

  const handleConnect4GameFinish = React.useCallback((winner) => {
    setConnect4Winner(winner);
    setConnect4Finished(true);
  }, []);

  const handlePlayAgainButtonClick = React.useCallback(() => {
    connect4Ref.current.reset();
    setCurrentPlayer(PLAYER1);
    setConnect4Winner(null);
    setConnect4Finished(false);
  }, []);

  const handleConnect4ChangePlayer = React.useCallback(
    (player) => setCurrentPlayer(player),
    []
  );

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Connect Four</h1>
      </header>
      <h5>
        Move your mouse over the top of the board and click to play :)
        <br />
        ⬇⬇⬇
      </h5>
      <Connect4
        ref={connect4Ref}
        numRows={6}
        numCols={7}
        onGameFinish={handleConnect4GameFinish}
        onChangePlayer={handleConnect4ChangePlayer}
      />
      {!connect4Finished && (
        <h4>PLAYER {currentPlayer === PLAYER1 ? '1' : '2'}</h4>
      )}
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
