type MoveType = {
  user_id: number;
  position: number;
  board_id: string;
  id?: number;
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

type UpdatedBoardType = {
  turn: TurnType;
  winner: GameResultType | null;
  winning_combo: WinningCombinationType | null;
};

type MarksType = TurnType[];

type WinningCombinationType = number[];

export {
  MoveType,
  BoardType,
  UpdatedBoardType,
  TurnType,
  GameResultType,
  MarksType,
  WinningCombinationType,
};
