import { MoveType } from '../types';
import GameService from '../services/GameService';

const resolvers = {
  Mutation: {
    makeMove: async (
      _parent: undefined,
      { user_id, position, board_id }: MoveType
    ) => {
      const game = new GameService(user_id, board_id, position);

      return await game.handleMove();
    },
  },
};

export = resolvers;
