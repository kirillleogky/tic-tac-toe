type Nullable<T> = T | null;

type MoveType = {
  user_id: number;
  position: number;
  board_id: string;
  id?: number;
};

type TurnType = 'x' | 'o';

type GameResultType = TurnType | 'draw' | '';

type BoardType = {
  id: string;
  turn: TurnType;
  user_1_id: number;
  user_2_id: Nullable<number>;
  winner: string;
  created_at: string;
};

type UpdatedBoardType = {
  turn: TurnType;
  winner: Nullable<GameResultType>;
  winning_combo: Nullable<WinningCombinationType>;
};

type MarksType = TurnType[];

type WinningCombinationType = [number, number, number];

type GameResultDataType = {
  gameResult: GameResultType;
  winningCombo: Nullable<WinningCombinationType>;
};

type WinnerDataType = {
  isWinner: boolean;
  winner: Nullable<GameResultType>;
  winningCombo: Nullable<WinningCombinationType>;
};

export {
  MoveType,
  BoardType,
  UpdatedBoardType,
  TurnType,
  GameResultType,
  MarksType,
  WinningCombinationType,
  GameResultDataType,
  WinnerDataType,
};
