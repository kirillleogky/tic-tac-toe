import { MoveType } from '../types';
import GameService from '../services/GameService';

const resolvers = {
  Mutation: {
    makeMove: async (_parent: undefined, args: MoveType) => {
      const { user_id, position, board_id } = args;
      return await GameService.handleMove(user_id, board_id, position);
    },
  },
};

export = resolvers;
