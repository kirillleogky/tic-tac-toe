import { knexClient } from '../../knexConfig';
import { BoardType, UpdatedBoardType } from '../types';

export const getBoardById = (id: string): Promise<BoardType> =>
  knexClient('boards')
    .where({ id })
    .select('turn', 'user_1_id', 'user_2_id')
    .first();

export const updateBoard = (updatedBoard: UpdatedBoardType, boardId: string) =>
  knexClient.transaction(trx => {
    return trx('boards').where({ id: boardId }).update(updatedBoard);
  });
