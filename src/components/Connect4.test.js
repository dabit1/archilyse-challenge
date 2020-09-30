import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Connect4 from './Connect4';
import { PLAYER1, PLAYER2 } from '../lib/connect-4';
import { act } from 'react-dom/test-utils';

const winGame = (fireEvent, columns) => {
  fireEvent.click(columns[0]);
  fireEvent.click(columns[1]);
  fireEvent.click(columns[0]);
  fireEvent.click(columns[1]);
  fireEvent.click(columns[0]);
  fireEvent.click(columns[1]);
  fireEvent.click(columns[0]);
  fireEvent.click(columns[1]);
  fireEvent.click(columns[0]);
};

const finishGameWithoutWinner = (fireEvent, columns) => {
  fireEvent.click(columns[0]);
  fireEvent.click(columns[0]);
  fireEvent.click(columns[1]);
  fireEvent.click(columns[2]);
  fireEvent.click(columns[1]);
  fireEvent.click(columns[2]);
  fireEvent.click(columns[3]);
  fireEvent.click(columns[3]);
};

describe('Connect4 component', () => {
  let props = {};
  const componentRef = React.createRef(null);
  const renderComponent = (changedProps) => {
    props = { ...props, ...changedProps };
    return render(<Connect4 ref={componentRef} {...props} />);
  };

  beforeEach(() => {
    props = {
      onGameFinish: jest.fn(),
      numRows: 6,
      numCols: 7,
      onChangePlayer: jest.fn(),
    };
  });

  it('renders a board component', () => {
    const { getByTestId } = renderComponent();
    const boardComponent = getByTestId('board');
    expect(boardComponent).toBeInTheDocument();
  });
  it('calls the prop "onGameFinish" when the game finishes with the winner as a param', () => {
    const { getByTestId } = renderComponent();
    const columnSelectorComponent = getByTestId('column-selector');
    const columns = columnSelectorComponent.querySelectorAll('div');

    winGame(fireEvent, columns);
    expect(props.onGameFinish).toHaveBeenCalledWith(PLAYER1);
  });
  it('calls the prop "onGameFinish" when the game finishes with null as a param if there was no winner', () => {
    props.numRows = 2;
    props.numCols = 4;
    const { getByTestId } = renderComponent();
    const columnSelectorComponent = getByTestId('column-selector');
    const columns = columnSelectorComponent.querySelectorAll('div');
    finishGameWithoutWinner(fireEvent, columns);
    expect(props.onGameFinish).toHaveBeenCalledWith(null);
  });
  it('calls the prop "onChangePlayer" when turn is switched', () => {
    const { getByTestId } = renderComponent();
    const columnSelectorComponent = getByTestId('column-selector');
    const columns = columnSelectorComponent.querySelectorAll('div');
    fireEvent.click(columns[0]);
    expect(props.onChangePlayer).toHaveBeenCalledWith(PLAYER2);
  });
  it('does not call the prop "onChangePlayer" when turn was not switched because of full column', () => {
    props.numRows = 2;
    props.numCols = 4;
    const { getByTestId } = renderComponent();
    const columnSelectorComponent = getByTestId('column-selector');
    const columns = columnSelectorComponent.querySelectorAll('div');
    fireEvent.click(columns[0]);
    fireEvent.click(columns[0]);
    fireEvent.click(columns[0]);
    expect(props.onChangePlayer).toHaveBeenCalledTimes(2);
  });
  it('has a method to reset the game when it finishes', () => {
    props.numRows = 2;
    props.numCols = 4;
    const { getByTestId, queryAllByTestId } = renderComponent();
    const columnSelectorComponent = getByTestId('column-selector');
    const columns = columnSelectorComponent.querySelectorAll('div');
    finishGameWithoutWinner(fireEvent, columns);
    act(() => {
      componentRef.current.reset();
    });
    expect(queryAllByTestId('piece').length).toEqual(0);
  });
});
