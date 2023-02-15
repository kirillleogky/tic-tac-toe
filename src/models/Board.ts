import { knexClient } from '../../knexConfig';
import { BoardType, UpdatedBoardType } from '../types';
export default class Board {
  static getBoardById(id: string): Promise<BoardType> {
    return knexClient('boards')
      .where({ id })
      .select('turn', 'user_1_id', 'user_2_id')
      .first();
  }

  static updateBoard(updatedBoard: UpdatedBoardType, boardId: string) {
    return knexClient.transaction(trx => {
      return trx('boards').where({ id: boardId }).update(updatedBoard);
    });
  }
}
