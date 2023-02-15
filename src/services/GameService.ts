import {
  GameResultType,
  MarksType,
  MoveType,
  TurnType,
  WinningCombinationType,
} from '../types';
import Board from '../models/Board';
import Moves from '../models/Moves';
import { WIN_MOVE_MATRIX, INITIAL_BOARD_STATE } from '../constants';

export default class GameService {
  static async getBoardData(userId: number, boardId: string) {
    const boardState = await Board.getBoardById(boardId);

    if (!boardState) {
      throw new Error('no existing board');
    }

    const { turn, user_1_id, user_2_id } = boardState;

    if (userId !== user_1_id && userId !== user_2_id) {
      throw new Error('invalid user');
    }

    if (userId === user_1_id || userId === user_2_id) {
      if (
        (userId === user_1_id && turn !== 'x') ||
        (userId === user_2_id && turn !== 'o')
      ) {
        throw new Error('not the right turn');
      }

      return { turn, user_1_id };
    } else {
      throw new Error('wrong related user id');
    }
  }

  static async getMovesData(boardId: string, currentPosition: number) {
    const moveState = await Moves.getMovesByBoardId(boardId);

    if (
      moveState.find(m => m.position === currentPosition) ||
      parseInt(String(currentPosition)) !== currentPosition ||
      currentPosition > 8 ||
      currentPosition < 0
    ) {
      throw new Error('invalid move');
    }

    return moveState;
  }
  static async handleMove(userId: number, boardId: string, position: number) {
    const { turn, user_1_id } = await this.getBoardData(userId, boardId);
    const moves = await this.getMovesData(boardId, position);

    const { gameResult, winningCombo } = this.finishGame(
      moves,
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
      turn: turn === 'x' ? 'o' : ('x' as TurnType),
      winner: gameResult ? gameResult : null,
      winning_combo: gameResult ? winningCombo : null,
    };

    console.log(`Move: ${insertedMove}`);
    console.log(`Board: ${updatedBoard}`);

    return Moves.addMove(insertedMove)
      .then(() => {
        Board.updateBoard(updatedBoard, boardId);
      })
      .then(() => {
        return { success: true };
      })
      .catch(error => {
        console.log(`Error ${error}`);
        throw error;
      });
  }

  static finishGame(
    moves: MoveType[],
    move: number,
    turn: TurnType,
    user_1_id: number
  ) {
    let winner: GameResultType = '';
    let winningCombo: WinningCombinationType = [];

    moves.forEach(({ position, user_id }: MoveType) => {
      INITIAL_BOARD_STATE[position] = user_id === user_1_id ? 'x' : 'o';
    });

    INITIAL_BOARD_STATE[move] = turn;

    const isWinner = WIN_MOVE_MATRIX.some(combo => {
      const [id1, id2, id3] = combo;
      const marks: MarksType = [
        INITIAL_BOARD_STATE[id1],
        INITIAL_BOARD_STATE[id2],
        INITIAL_BOARD_STATE[id3],
      ];
      const [firstMark] = marks;
      const isWinningCombo =
        !!firstMark && marks.every(mark => mark === firstMark);

      if (isWinningCombo) {
        winner = firstMark;
        winningCombo = combo;

        return true;
      }

      return false;
    });

    let gameResult: GameResultType = (isWinner && winner) || '';

    if (INITIAL_BOARD_STATE.every(mark => !!mark) && !winner) {
      gameResult = 'draw';
    }

    return { gameResult, winningCombo };
  }
}
