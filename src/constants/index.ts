import { WinningCombinationType } from '../types';

export const WIN_MOVE_MATRIX: WinningCombinationType[] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const FIRST_BOARD_POSITION = 0;
export const LAST_BOARD_POSITION = 8;

export const DEFAULT_PORT = 8000;

export const DEFAULT_KNEX_PORT = 5432;
