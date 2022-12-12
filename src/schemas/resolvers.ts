import { handleMove, getUsers } from '../utils/handleMove';
import { MoveType } from '../types';

const resolvers = {
  Mutation: {
    makeMove: (_parent: undefined, args: MoveType) => {
      const { user_id, position, board_id } = args;
      return handleMove(user_id, board_id, position);
    },
  },
  Query: {
    getUsers: async () => await getUsers(),
  },
};

export = resolvers;
