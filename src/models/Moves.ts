import { knexClient } from '../../knexConfig';
import { MoveType } from '../types';

export const getMovesByBoardId = (id: string): Promise<MoveType[]> =>
  knexClient('moves').where({ board_id: id }).select('user_id', 'position');

export const addMove = (insertedMove: MoveType) =>
  knexClient.transaction(trx => {
    return trx('moves').insert(insertedMove);
  });
