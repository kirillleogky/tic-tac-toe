import { MoveType, TurnType, GameResultType } from '../types';

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
  const boardState = Array(9).fill(undefined);
  let winner: GameResultType = '';

  moves.forEach(({ position, user_id }: MoveType) => {
    boardState[position] = user_id === user_1_id ? 'x' : 'o';
  });

  boardState[move] = turn;

  const isWinner = winMoveMatrix.some(combo => {
    const [id1, id2, id3] = combo;
    const marks = [boardState[id1], boardState[id2], boardState[id3]];
    const [firstMark] = marks;
    const isWinningCombo =
      !!firstMark && marks.every(mark => mark === firstMark);

    if (isWinningCombo) {
      winner = firstMark;

      return true;
    }

    return false;
  });

  let gameResult: GameResultType = (isWinner && winner) || '';

  if (boardState.every(mark => !!mark) && !winner) {
    gameResult = 'draw';
  }

  return gameResult;
};

export = finishGame;
