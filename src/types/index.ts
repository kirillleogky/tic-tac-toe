type MoveType = {
  user_id: number;
  position: number;
  board_id: string;
  id: number;
};

type TurnType = 'x' | 'o';

type GameResultType = 'x' | 'o' | 'draw' | '';

type BoardType = {
  id: string;
  turn: TurnType;
  user_1_id: number;
  user_2_id: number | null;
  winner: string;
  created_at: string;
};

type MarksType = TurnType[];

type WinningCombinationType = number[];

export {
  MoveType,
  BoardType,
  TurnType,
  GameResultType,
  MarksType,
  WinningCombinationType,
};
