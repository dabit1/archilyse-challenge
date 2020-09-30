import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ColumnSelector from './ColumnSelector';
import { PLAYER1, PLAYER2 } from '../lib/connect-4';

describe('ColumnSelector component', () => {
  let props = {};
  const renderComponent = (changedProps) => {
    props = { ...props, ...changedProps };
    return render(<ColumnSelector {...props} />);
  };

  beforeEach(() => {
    props = {
      numCols: 5,
      currentPlayer: PLAYER1,
      onSelectColumn: jest.fn(),
    };
  });

  it('renders a row with a with the number of columns of "numCols"', () => {
    const { getByTestId } = renderComponent();
    const columnSelectorComponent = getByTestId('column-selector');
    expect(columnSelectorComponent.querySelectorAll('div').length).toEqual(5);
  });
  it('renders a piece when entering the cursor in a column', () => {
    const { getByTestId } = renderComponent();
    const columnSelectorComponent = getByTestId('column-selector');
    const column2 = columnSelectorComponent.querySelectorAll('div')[1];
    fireEvent.mouseEnter(column2);
    expect(column2.querySelector('.Piece')).toBeInTheDocument();
  });
  it('renders a piece with a different color depending on the current player', () => {
    const { getByTestId, rerender } = renderComponent();
    const columnSelectorComponent = getByTestId('column-selector');
    const column2 = columnSelectorComponent.querySelectorAll('div')[1];
    fireEvent.mouseEnter(column2);
    expect(column2.querySelector('.Piece-player1')).toBeInTheDocument();
    props.currentPlayer = PLAYER2;
    rerender(<ColumnSelector {...props} />);
    expect(column2.querySelector('.Piece-player2')).toBeInTheDocument();
  });
  it('stops rendering a piece when leaving the cursor in a column', () => {
    const { getByTestId } = renderComponent();
    const columnSelectorComponent = getByTestId('column-selector');
    const column2 = columnSelectorComponent.querySelectorAll('div')[1];
    fireEvent.mouseEnter(column2);
    fireEvent.mouseLeave(column2);
    expect(column2.querySelector('.Piece')).not.toBeInTheDocument();
  });
  it('calls the prop "onSelectColumn" when clicking on a column and passes the column number', () => {
    const { getByTestId } = renderComponent();
    const columnSelectorComponent = getByTestId('column-selector');
    const column2 = columnSelectorComponent.querySelectorAll('div')[1];
    fireEvent.click(column2);
    expect(props.onSelectColumn).toHaveBeenCalledWith(1);
  });
});
