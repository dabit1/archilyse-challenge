import React from 'react';
import PropTypes from 'prop-types';
import Hole from './Hole';
import './Board.css';
import ColumnSelector from './ColumnSelector';
import { PLAYER1, PLAYER2 } from '../lib/connect-4';

const Board = ({ board, currentPlayer, onAddPiece }) => {
  return (
    <div className="Board" data-testid="board">
      <ColumnSelector
        numCols={board[0].length}
        currentPlayer={currentPlayer}
        onSelectColumn={onAddPiece}
      />
      <div className="Board-container">
        {board.map((row, i) => (
          <div key={`board-row-${i}`} className="Board-row">
            {row.map((col, i) => (
              <Hole key={`board-col-${i}`} player={col === 0 ? null : col} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  currentPlayer: PropTypes.oneOf([PLAYER1, PLAYER2]),
  onAddPiece: PropTypes.func.isRequired,
};

Board.defaultProps = {
  currentPlayer: null,
};

export default Board;
