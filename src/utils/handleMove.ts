import { knexClient } from '../../knexConfig';
import { MoveType, BoardType } from '../types';
import finishGame from './finishGame';

const handleMove = async (
  userId: number,
  boardId: string,
  position: number
) => {
  return knexClient.transaction(trx => {
    return trx
      .where({ id: boardId })
      .select('turn', 'user_1_id', 'user_2_id')
      .from('boards')
      .then((boardState: BoardType[]) => {
        if (!boardState.length) {
          throw new Error('no existing board');
        }

        const { turn, user_1_id, user_2_id } = boardState[0];

        if (userId !== user_1_id && userId !== user_2_id) {
          throw new Error('invalid user');
        }

        if (userId === user_1_id || userId === user_2_id) {
          if (
            (userId === user_1_id && turn !== 'x') ||
            (userId === user_2_id && turn !== 'o')
          ) {
            throw new Error('not the right turn');
          } else {
            return trx
              .where({ board_id: boardId })
              .from('moves')
              .select('user_id', 'position')
              .then((moveState: MoveType[]) => {
                if (
                  moveState.find(m => m.position === position) ||
                  parseInt(String(position)) !== position ||
                  position > 8 ||
                  position < 0
                ) {
                  throw new Error('invalid move');
                }

                const gameResult = finishGame(
                  moveState,
                  position,
                  turn,
                  user_1_id
                );
                const insertedMove = {
                  user_id: userId,
                  board_id: boardId,
                  position,
                };
                const updatedBoard = {
                  turn: turn === 'x' ? 'o' : 'x',
                  winner: !!gameResult ? gameResult : null,
                };

                console.log(`Move: ${insertedMove}`);
                console.log(`Board: ${updatedBoard}`);

                return trx('moves')
                  .insert(insertedMove)
                  .then(() => {
                    return trx('boards')
                      .where({ id: boardId })
                      .update(updatedBoard);
                  });
              });
          }
        }
      })
      .then(() => {
        return { success: true };
      })
      .catch(error => {
        console.log(`Error ${error}`);
        throw error;
      });
  });
};

const getUsers = async () => {
  try {
    return await knexClient('users');
  } catch (error) {
    console.log(`Error ${error}`);
    throw error;
  }
};

export { handleMove, getUsers };
