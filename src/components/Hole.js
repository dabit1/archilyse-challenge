import React from 'react';
import PropTypes from 'prop-types';
import './Hole.css';
import Piece from './Piece';
import { PLAYER1, PLAYER2 } from '../lib/connect-4';

const Hole = ({ player }) => {
  return (
    <div className="Hole" data-testid="hole">
      {player && <Piece player={player} />}
    </div>
  );
};

Hole.propTypes = {
  player: PropTypes.oneOf([PLAYER1, PLAYER2]),
};

Hole.defaultProps = {
  player: null,
};

export default Hole;
