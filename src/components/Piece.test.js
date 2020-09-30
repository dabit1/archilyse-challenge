import React from 'react';
import { render } from '@testing-library/react';
import Piece from './Piece';
import { PLAYER1, PLAYER2 } from '../lib/connect-4';

describe('Piece component', () => {
  let props = {};
  const renderComponent = (changedProps) => {
    props = { ...props, ...changedProps };
    return render(<Piece {...props} />);
  };

  beforeEach(() => {
    props = {
      player: PLAYER1,
    };
  });

  it('adds the class "Piece-player1" when "player" is the player 1', () => {
    const { getByTestId } = renderComponent();
    const piece = getByTestId('piece');
    expect(piece).toHaveClass('Piece-player1');
  });
  it('adds the class "Piece-player2" when "player" is the player 2', () => {
    props.player = PLAYER2;
    const { getByTestId } = renderComponent();
    const piece = getByTestId('piece');
    expect(piece).toHaveClass('Piece-player2');
  });
  it('does not add any class when "player" is falsy', () => {
    props.player = null;
    const { getByTestId } = renderComponent();
    const piece = getByTestId('piece');
    expect(piece).not.toHaveClass('Piece-player1');
    expect(piece).not.toHaveClass('Piece-player2');
  });
});
