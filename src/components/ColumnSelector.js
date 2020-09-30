import React from 'react';
import PropTypes from 'prop-types';
import './ColumnSelector.css';
import Piece from './Piece';

const ColumnSelector = ({ numCols, currentPlayer, onSelectColumn }) => {
  const [selectedColumn, setSelectedColumn] = React.useState(null);

  const handleColMouseEnter = React.useCallback(
    (column) => setSelectedColumn(column),
    []
  );

  const handleColMouseLeave = React.useCallback(
    () => setSelectedColumn(null),
    []
  );

  return (
    <div className="ColumnSelector" data-testid="column-selector">
      {Array.from({ length: numCols }, (_, i) => (
        <div
          key={`column-selector-${i}`}
          className="ColumnSelector-col"
          onMouseEnter={() => handleColMouseEnter(i)}
          onMouseLeave={handleColMouseLeave}
          onClick={() => onSelectColumn(i)}
        >
          {selectedColumn === i && <Piece player={currentPlayer} />}
        </div>
      ))}
    </div>
  );
};

ColumnSelector.propTypes = {
  numCols: PropTypes.number.isRequired,
  currentPlayer: PropTypes.oneOf([1, 2]),
  onSelectColumn: PropTypes.func.isRequired,
};

ColumnSelector.defaultProps = {
  currentPlayer: null,
};

export default ColumnSelector;
