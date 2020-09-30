import {
  createBoard,
  createGame,
  PLAYER1,
  isExistingColumn,
  hasEmptyColumnHole,
  switchTurn,
  PLAYER2,
  hasStraightVerticalLine,
  hasPlayerWon,
  addPieceToColumn,
  isBoardComplete,
  play,
  hasStraightHorizontalLine,
} from './connect-4';

describe('Connect 4', () => {
  describe('createBoard', () => {
    it('creates a board with 2 rows and 2 columns', () => {
      const board = createBoard(2, 2);
      expect(board).toEqual([
        [0, 0],
        [0, 0],
      ]);
    });
    it('creates a board with 3 rows and 4 columns', () => {
      const board = createBoard(3, 4);
      expect(board).toEqual([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ]);
    });
  });
  describe('createGame', () => {
    it('creates a new game', () => {
      const game = createGame(2, 2);
      expect(game).toEqual({
        numCols: 2,
        numRows: 2,
        currentPlayer: PLAYER1,
        winner: null,
        board: [
          [0, 0],
          [0, 0],
        ],
      });
    });
  });
  describe('isExistingColumn', () => {
    const numCols = 4;
    it('returns false when column number is lesser than 0', () => {
      const columnNumber = -1;
      expect(isExistingColumn(numCols, columnNumber)).toBeFalsy();
    });
    it('returns false when column number is greater than the number of columns minus one', () => {
      const columnNumber = 4;
      expect(isExistingColumn(numCols, columnNumber)).toBeFalsy();
    });
    it('returns true when column number is equal to 0', () => {
      const columnNumber = 0;
      expect(isExistingColumn(numCols, columnNumber)).toBeTruthy();
    });
    it('returns true when column number is equal to the number of columns minus one', () => {
      const columnNumber = 3;
      expect(isExistingColumn(numCols, columnNumber)).toBeTruthy();
    });
  });
  describe('hasEmptyColumnHole', () => {
    const board = createBoard(2, 2);

    it('returns true when the column has empty holes', () => {
      expect(hasEmptyColumnHole(board, 1)).toBeTruthy();
    });
    it('returns false when the column has no empty holes', () => {
      board[1][1] = 1;
      board[0][1] = 1;
      expect(hasEmptyColumnHole(board, 1)).toBeFalsy();
    });
  });
  describe('hasStraightHorizontalLine', () => {
    const a = PLAYER1;
    const b = PLAYER2;

    it('returns true if it has four pieces in a row when the new position is in the middle', () => {
      const board = [
        [0, 0, 0, 0, 0, 0],
        [0, a, a, a, a, 0],
        [0, b, b, a, a, 0],
        [0, a, a, b, b, 0],
        [0, b, b, a, a, 0],
        [0, a, a, b, b, 0],
      ];
      expect(hasStraightHorizontalLine(board, { x: 1, y: 2 }, 6)).toBeTruthy();
    });
    it('returns true if it has four pieces in a row when the new position is at the front of the line', () => {
      const board = [
        [0, 0, 0, 0, 0, 0],
        [0, a, a, a, a, 0],
        [0, b, b, a, a, 0],
        [0, a, a, b, b, 0],
        [0, b, b, a, a, 0],
        [0, a, a, b, b, 0],
      ];
      expect(hasStraightHorizontalLine(board, { x: 1, y: 1 }, 6)).toBeTruthy();
    });
    it('returns true if it has four pieces in a row when the new position is at the end of the line', () => {
      const board = [
        [0, 0, 0, 0, 0, 0],
        [0, a, a, a, a, 0],
        [0, b, b, a, a, 0],
        [0, a, a, b, b, 0],
        [0, b, b, a, a, 0],
        [0, a, a, b, b, 0],
      ];
      expect(hasStraightHorizontalLine(board, { x: 1, y: 4 }, 6)).toBeTruthy();
    });
    it('returns false if it does not have four pieces in a row', () => {
      const board = [
        [0, 0, 0, 0, 0, 0],
        [0, a, a, b, a, 0],
        [0, b, b, a, a, 0],
        [0, a, a, b, b, 0],
        [0, b, b, a, a, 0],
        [0, a, a, b, b, 0],
      ];
      expect(hasStraightHorizontalLine(board, { x: 1, y: 2 }, 6)).toBeFalsy();
    });
  });
  describe('hasStraightVerticalLine', () => {
    const a = PLAYER1;
    const b = PLAYER2;

    it('returns true if it has four pieces in a column when the new piece completes a vertical line', () => {
      const board = [
        [0, 0, 0, b, 0, 0],
        [0, 0, 0, b, 0, 0],
        [0, 0, 0, b, 0, 0],
        [0, 0, 0, b, 0, 0],
        [0, 0, 0, a, 0, 0],
        [0, 0, 0, b, 0, 0],
      ];
      expect(hasStraightVerticalLine(board, { x: 0, y: 3 }, 6)).toBeTruthy();
    });
    it('returns false if it does not have four pieces in a column', () => {
      const board = [
        [0, 0, 0, b, 0, 0],
        [0, 0, 0, a, 0, 0],
        [0, 0, 0, b, 0, 0],
        [0, 0, 0, b, 0, 0],
        [0, 0, 0, a, 0, 0],
        [0, 0, 0, b, 0, 0],
      ];
      expect(hasStraightVerticalLine(board, { x: 2, y: 3 }, 6)).toBeFalsy();
    });
  });
  describe('hasPlayerWon', () => {
    const a = PLAYER1;
    const b = PLAYER2;

    it('returns true if the player has got a line of four pieces', () => {
      const board = [
        [0, 0, 0, b, 0, 0],
        [0, 0, 0, b, 0, 0],
        [0, 0, 0, b, 0, 0],
        [0, 0, 0, b, 0, 0],
        [0, 0, 0, a, 0, 0],
        [0, 0, 0, a, 0, 0],
      ];
      expect(hasPlayerWon(board, { x: 0, y: 3 }, 6, 6)).toBeTruthy();
    });
    it('returns false if the player has not got a line of four pieces', () => {
      const board = [
        [0, 0, 0, a, 0, 0],
        [0, 0, 0, b, 0, 0],
        [0, 0, 0, b, 0, 0],
        [0, 0, 0, b, 0, 0],
        [0, 0, 0, a, 0, 0],
        [0, 0, 0, a, 0, 0],
      ];
      expect(hasPlayerWon(board, { x: 2, y: 3 }, 6, 6)).toBeFalsy();
    });
  });
  describe('switchTurn', () => {
    const game = createGame(2, 2);

    it('returns the player 1 when the current player is the player 2', () => {
      game.currentPlayer = PLAYER1;
      switchTurn(game);
      expect(game.currentPlayer).toEqual(PLAYER2);
    });
    it('returns the player 2 when the current player is the player 1', () => {
      game.currentPlayer = PLAYER2;
      switchTurn(game);
      expect(game.currentPlayer).toEqual(PLAYER1);
    });
  });
  describe('addPieceToColumn', () => {
    it('adds a new piece in the board when it is empty', () => {
      const game = createGame(3, 3);
      addPieceToColumn(game, 2);
      expect(game.board).toEqual([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, PLAYER1],
      ]);
    });
    it('adds a new piece in the board next to the last one', () => {
      const game = createGame(3, 3);
      addPieceToColumn(game, 2);
      addPieceToColumn(game, 2);
      expect(game.board).toEqual([
        [0, 0, 0],
        [0, 0, PLAYER1],
        [0, 0, PLAYER1],
      ]);
    });
    it('adds a new piece in the board next to the last one whe there is only one hole', () => {
      const game = createGame(3, 3);
      addPieceToColumn(game, 2);
      addPieceToColumn(game, 2);
      addPieceToColumn(game, 2);
      expect(game.board).toEqual([
        [0, 0, PLAYER1],
        [0, 0, PLAYER1],
        [0, 0, PLAYER1],
      ]);
    });
    it('returns the hole position that has been filled up', () => {
      const game = createGame(3, 3);
      const position = addPieceToColumn(game, 2);
      expect(position).toEqual({ x: 2, y: 2 });
    });
  });
  describe('isBoardComplete', () => {
    it('returns false if the board is not complete', () => {
      const board = [
        [PLAYER1, PLAYER2, PLAYER1, PLAYER1],
        [PLAYER2, PLAYER1, PLAYER1, PLAYER2],
        [0, PLAYER2, PLAYER2, PLAYER1],
      ];
      expect(isBoardComplete(board, 3, 4)).toBeFalsy();
    });
    it('returns true if the board is complete', () => {
      const board = [
        [PLAYER1, PLAYER2, PLAYER1, PLAYER1],
        [PLAYER2, PLAYER1, PLAYER1, PLAYER2],
        [PLAYER2, PLAYER2, PLAYER2, PLAYER1],
      ];
      expect(isBoardComplete(board, 3, 4)).toBeTruthy();
    });
  });
  describe('play', () => {
    let game;
    beforeEach(() => {
      game = createGame(4, 4);
    });
    it('throws an error when the game has already a winner', () => {
      game.winner = PLAYER2;
      expect(() => play(game, 1)).toThrow('The game has already finished!');
    });
    it('returns undefined when the column to add a piece does not exist', () => {
      expect(play(game, 5)).toEqual(undefined);
    });
    it('returns undefined when the column has no empty holes', () => {
      play(game, 1);
      play(game, 1);
      play(game, 1);
      play(game, 1);
      expect(play(game, 1)).toEqual(undefined);
    });
    it('adds a new piece', () => {
      play(game, 1);
      expect(game.board).toEqual([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, PLAYER1, 0, 0],
      ]);
    });
    it('returns true when the current player has won', () => {
      game.board = [
        [0, 0, 0, 0],
        [0, PLAYER1, 0, 0],
        [0, PLAYER1, 0, 0],
        [0, PLAYER1, 0, 0],
      ];
      const result = play(game, 1);
      expect(result).toBeTruthy();
      expect(game.winner).toEqual(PLAYER1);
    });
    it('returns false when the current player has not won', () => {
      game.board = [
        [0, 0, 0, 0],
        [0, PLAYER1, PLAYER2, PLAYER1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
      const result = play(game, 0);
      expect(result).toBeFalsy();
    });
    it('returns true when the board is complete but it does not set any winner', () => {
      game.board = [
        [0, PLAYER1, PLAYER2, PLAYER2],
        [PLAYER2, PLAYER1, PLAYER1, PLAYER1],
        [PLAYER1, PLAYER1, PLAYER2, PLAYER2],
        [PLAYER2, PLAYER2, PLAYER2, PLAYER1],
      ];
      const result = play(game, 0);
      expect(result).toBeTruthy();
      expect(game.winner).not.toEqual(PLAYER1);
      expect(game.winner).not.toEqual(PLAYER2);
    });
    it('switches the turn to the other player', () => {
      play(game, 0);
      expect(game.currentPlayer).toEqual(PLAYER2);
    });
  });
});
