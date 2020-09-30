import React from 'react';
import { render } from '@testing-library/react';
import Board from './Board';
import { PLAYER1 } from '../lib/connect-4';

describe('Board component', () => {
  let props = {};
  const renderComponent = (changedProps) => {
    props = { ...props, ...changedProps };
    return render(<Board {...props} />);
  };

  beforeEach(() => {
    props = {
      board: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      currentPlayer: PLAYER1,
      onAddPiece: () => {},
    };
  });

  it('renders a column selector component', () => {
    const { getByTestId } = renderComponent();
    const columnSelectorComponent = getByTestId('column-selector');
    expect(columnSelectorComponent).toBeInTheDocument();
  });
  it('renders a board with 2 rows and 4 columns', () => {
    const { getByTestId } = renderComponent();
    const boardComponent = getByTestId('board');
    expect(boardComponent.querySelectorAll('.Board-row').length).toEqual(2);
    boardComponent
      .querySelectorAll('.Board-row')
      .forEach((row) =>
        expect(row.querySelectorAll('.Hole').length).toEqual(4)
      );
  });
  it('renders 8 holes', () => {
    const { getAllByTestId } = renderComponent();
    const holeComponents = getAllByTestId('hole');
    expect(holeComponents.length).toEqual(8);
  });
  it('renders a piece when the board has some', () => {
    props.board = [
      [0, PLAYER1, 0, 0],
      [0, 0, 0, 0],
    ];
    const { getByTestId } = renderComponent();
    const pieceComponent = getByTestId('piece');
    expect(pieceComponent).toBeInTheDocument();
  });
});
