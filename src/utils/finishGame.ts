import { MoveType, TurnType } from '../types';

const winMoveMatrix = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 8],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const finishGame = (
  moves: MoveType[],
  move: number,
  turn: TurnType,
  user_1_id: number
) => {
  let gameOver = false;
  const boardState = Array(9).fill(undefined);

  moves.forEach(({ position, user_id }: MoveType) => {
    boardState[position] = user_id === user_1_id ? 'x' : 'o';
  });

  boardState[move] = turn;

  for (let i = winMoveMatrix.length - 1; i >= 0; i--) {
    const winMove = winMoveMatrix[i];

    if (
      winMove.includes(move) &&
      boardState[winMove[0]] === turn &&
      boardState[winMove[1]] === turn &&
      boardState[winMove[2]] === turn
    ) {
      gameOver = true;
      break;
    }
  }
  return gameOver;
};

export = finishGame;
