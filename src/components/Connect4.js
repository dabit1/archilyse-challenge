import React from 'react';
import PropTypes from 'prop-types';
import Board from './Board';
import { createGame, play } from '../lib/connect-4';

const Connect4 = React.forwardRef(
  ({ onGameFinish, onChangePlayer, numRows, numCols }, ref) => {
    const [game, setGame] = React.useState(createGame(numRows, numCols));
    const [gameFinished, setGameFinished] = React.useState(false);
    const [board, setBoard] = React.useState(game.board);
    const [currentPlayer, setCurrentPlayer] = React.useState(
      game.currentPlayer
    );

    React.useImperativeHandle(ref, () => ({
      reset: () => {
        const newGame = createGame(numRows, numCols);
        setGame(newGame);
        setBoard(newGame.board);
        setGameFinished(false);
        setCurrentPlayer(newGame.currentPlayer);
      },
    }));

    const handleBoardAddPiece = React.useCallback(
      (column) => {
        if (!gameFinished) {
          const gameFinished = play(game, column);
          setBoard([...game.board]);
          if (game.currentPlayer !== currentPlayer) {
            onChangePlayer(game.currentPlayer);
            setCurrentPlayer(game.currentPlayer);
          }

          if (gameFinished) {
            onGameFinish(game.winner);
            setGameFinished(true);
          }
        }
      },
      [currentPlayer, game, gameFinished, onChangePlayer, onGameFinish]
    );

    return (
      <Board
        board={board}
        currentPlayer={currentPlayer}
        onAddPiece={handleBoardAddPiece}
      />
    );
  }
);

Connect4.propTypes = {
  onGameFinish: PropTypes.func.isRequired,
  onChangePlayer: PropTypes.func.isRequired,
  numRows: PropTypes.number.isRequired,
  numCols: PropTypes.number.isRequired,
};

export default Connect4;
