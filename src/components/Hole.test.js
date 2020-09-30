import React from 'react';
import { render } from '@testing-library/react';
import Hole from './Hole';
import { PLAYER1 } from '../lib/connect-4';

describe('Hole component', () => {
  let props = {};
  const renderComponent = (changedProps) => {
    props = { ...props, ...changedProps };
    return render(<Hole {...props} />);
  };

  beforeEach(() => {
    props = {
      player: PLAYER1,
    };
  });

  it('renders a piece if "player" prop has a non falsy value', () => {
    const { getByTestId } = renderComponent();
    const piece = getByTestId('piece');
    expect(piece).toBeInTheDocument();
  });
  it('does not render a piece if "player" prop has a falsy value', () => {
    props.player = null;
    const { queryByTestId } = renderComponent();
    const piece = queryByTestId('piece');
    expect(piece).toBe(null);
  });
});
