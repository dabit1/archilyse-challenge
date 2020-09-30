export const PLAYER1 = 1;
export const PLAYER2 = 2;

/**
 * Creates a new empty game board
 * @param {number} numRows - Number of rows of the board
 * @param {number} numCols - Number of columns of the board
 * @returns {number[][]}
 */
export const createBoard = (numRows, numCols) => {
  const board = [];
  for (let i = 0; i < numRows; i++) {
    board[i] = [];
    for (let i2 = 0; i2 < numCols; i2++) {
      board[i][i2] = 0;
    }
  }
  return board;
};

/**
 * Creates a new game data set
 * @param {number} numRows - Number of rows of the board
 * @param {number} numCols - Number of columns of the board
 * @returns {Object}
 */
export const createGame = (numRows, numCols) => ({
  numCols,
  numRows,
  currentPlayer: PLAYER1,
  winner: null,
  board: createBoard(numRows, numCols),
});

/**
 * Checks if the column exists in the board
 * @param {number} numCols - Number of columns of the board
 * @param {number} column - Column to check
 * @returns {boolean}
 */
export const isExistingColumn = (numCols, column) =>
  column >= 0 && column < numCols;

/**
 * Checks if the column has at least one empty hole
 * @param {number[][]} board - The board of the game
 * @param {number} column - Column to check
 * @returns {boolean}
 */
export const hasEmptyColumnHole = (board, column) => board[0][column] === 0;

/**
 * Checks if the player got a horizontal line of four pieces
 * @param {number[][]} board - The board of the game
 * @param {Object} lastHoleFilledUp - Last hole that has been filled up. Ex: { x: 0, y: 2}
 * @param {number} lastHoleFilledUp.x - X value of the hole
 * @param {number} lastHoleFilledUp.y - Y value of the hole
 * @param {number} numCols - Number of columns of the board
 * @returns {boolean}
 */
export const hasStraightHorizontalLine = (board, lastHoleFilledUp, numCols) => {
  let count = 1;
  const { x, y } = lastHoleFilledUp;
  const player = board[x][y];

  for (let i = y - 1; i >= 0 && board[x][i] === player; i--) {
    count++;
  }

  for (
    let i = y + 1;
    i < numCols && count !== 4 && board[x][i] === player;
    i++
  ) {
    count++;
  }

  return count === 4;
};

/**
 * Checks if the player got a vertical line of four pieces
 * @param {number[][]} board - The board of the game
 * @param {Object} lastHoleFilledUp - Last hole that has been filled up. Ex: { x: 0, y: 2}
 * @param {number} lastHoleFilledUp.x - X value of the hole
 * @param {number} lastHoleFilledUp.y - Y value of the hole
 * @param {number} numRows - Number of rows of the board
 * @returns {boolean}
 */
export const hasStraightVerticalLine = (board, lastHoleFilledUp, numRows) => {
  let count = 1;
  const { x, y } = lastHoleFilledUp;
  const player = board[x][y];

  for (let i = x + 1; i < numRows && board[i][y] === player; i++) {
    count++;
  }

  return count === 4;
};

/**
 * Checks if the player has won
 * @param {number[][]} board - The board of the game
 * @param {number} player - The player who has played the last
 * @param {Object} lastHoleFilledUp - Last hole that has been filled up. Ex: { x: 0, y: 2}
 * @param {number} lastHoleFilledUp.x - X value of the hole
 * @param {number} lastHoleFilledUp.y - Y value of the hole
 * @param {number} numRows - Number of rows of the board
 * @param {number} numCols - Number of columns of the board
 * @returns {boolean}
 */
export const hasPlayerWon = (board, lastHoleFilledUp, numRows, numCols) =>
  hasStraightVerticalLine(board, lastHoleFilledUp, numRows) ||
  hasStraightHorizontalLine(board, lastHoleFilledUp, numCols);

/**
 * Changes the turn
 * @param {Object} game - The game data set
 */
export const switchTurn = (game) => {
  game.currentPlayer = game.currentPlayer === PLAYER1 ? PLAYER2 : PLAYER1;
};

/**
 * Adds a new piece in the board
 * @param {Object} game - The game data set
 * @param {Object} column - Column where the piece will be inserted
 * @returns {Object} - Returns the position of the hole that has been filled up. Ex: { x: 1, y: 2}
 */
export const addPieceToColumn = (game, column) => {
  const firstNonEmptyHole = game.board.findIndex((row) => row[column] !== 0);
  const rowToAddPiece =
    firstNonEmptyHole === -1 ? game.board.length - 1 : firstNonEmptyHole - 1;
  game.board[rowToAddPiece][column] = game.currentPlayer;
  return { x: rowToAddPiece, y: column };
};

/**
 * Checks if the board is complete
 * @param {number[][]} board - The board of the game
 * @param {number} numRows - Number of rows of the board
 * @param {number} numCols - Number of columns of the board
 * @returns {boolean}
 */
export const isBoardComplete = (board, numRows, numCols) => {
  for (let i = 0; i < numRows; i++) {
    for (let i2 = 0; i2 < numCols; i2++) {
      if (board[i][i2] === 0) {
        return false;
      }
    }
  }
  return true;
};

/**
 * Completes a new turn of the game
 * @param {Object} game - The game data set
 * @param {number} column - Column where the piece will be inserted
 * @returns {Boolean} - If returns true it means that the game has finished
 */
export const play = (game, column) => {
  if (game.winner) {
    throw new Error('The game has already finished!');
  } else if (
    !isExistingColumn(game.numCols, column) ||
    !hasEmptyColumnHole(game.board, column)
  ) {
    return;
  }
  const holePosition = addPieceToColumn(game, column);
  if (hasPlayerWon(game.board, holePosition, game.numRows, game.numCols)) {
    game.winner = game.currentPlayer;
    return true;
  } else if (isBoardComplete(game.board, game.numRows, game.numCols)) {
    return true;
  }
  switchTurn(game);

  return false;
};
