import { knexClient } from '../../knexConfig';
import { MoveType } from '../types';
export default class Moves {
  static getMovesByBoardId(id: string): Promise<MoveType[]> {
    return knexClient('moves')
      .where({ board_id: id })
      .select('user_id', 'position');
  }

  static addMove(insertedMove: MoveType) {
    return knexClient.transaction(trx => {
      return trx('moves').insert(insertedMove);
    });
  }
}
