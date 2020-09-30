import React from 'react';
import PropTypes from 'prop-types';
import './Piece.css';
import { PLAYER1, PLAYER2 } from '../lib/connect-4';

const player1ClassName = 'Piece-player1';
const player2ClassName = 'Piece-player2';
const Piece = ({ player }) => {
  return (
    <div
      data-testid="piece"
      className={`Piece ${
        (player &&
          (player === PLAYER1 ? player1ClassName : player2ClassName)) ||
        ''
      }`}
    />
  );
};

Piece.propTypes = {
  player: PropTypes.oneOf([PLAYER1, PLAYER2]),
};

Piece.defaultProps = {
  player: null,
};

export default Piece;
