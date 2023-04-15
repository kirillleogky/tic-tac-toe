import {
  GameResultDataType,
  GameResultType,
  MarksType,
  MoveType,
  TurnType,
  WinnerDataType,
  WinningCombinationType,
} from '../types';
import { getBoardById, updateBoard } from '../models/Board';
import { getMovesByBoardId, addMove } from '../models/Moves';
import {
  WIN_MOVE_MATRIX,
  FIRST_BOARD_POSITION,
  LAST_BOARD_POSITION,
} from '../constants';

export default class GameService {
  private userId: number;
  private boardId: string;
  private position: number;
  private turn: TurnType;
  private firstUserId: number;
  private movesList: MoveType[];
  private gameResultData: GameResultDataType;
  private winnerData: WinnerDataType;
  private boardState: TurnType[];

  constructor(userId: number, boardId: string, position: number) {
    this.userId = userId;
    this.boardId = boardId;
    this.position = position;
    this.turn = 'x';
    this.firstUserId = 0;
    this.movesList = [];
    this.gameResultData = {
      gameResult: '',
      winningCombo: null,
    };
    this.winnerData = {
      isWinner: false,
      winner: null,
      winningCombo: null,
    };
    this.boardState = Array(9).fill(undefined);
  }

  private async getBoardData() {
    const boardState = await getBoardById(this.boardId);

    if (!boardState) {
      throw new Error('no existing board');
    }

    const { turn, user_1_id, user_2_id } = boardState;

    if (this.userId !== user_1_id && this.userId !== user_2_id) {
      throw new Error('invalid user');
    }

    if (this.userId === user_1_id || this.userId === user_2_id) {
      if (
        (this.userId === user_1_id && turn !== 'x') ||
        (this.userId === user_2_id && turn !== 'o')
      ) {
        throw new Error('not the right turn');
      }

      this.turn = turn;
      this.firstUserId = user_1_id;
    } else {
      throw new Error('wrong related user id');
    }
  }

  private async getMovesData() {
    const moveState = await getMovesByBoardId(this.boardId);

    if (
      moveState.find(move => move.position === this.position) ||
      parseInt(String(this.position)) !== this.position ||
      this.position > LAST_BOARD_POSITION ||
      this.position < FIRST_BOARD_POSITION
    ) {
      throw new Error('invalid move');
    }

    this.movesList = moveState;
  }

  async handleMove() {
    await this.getBoardData();
    await this.getMovesData();

    this.finishGame();

    const insertedMove = {
      user_id: this.userId,
      board_id: this.boardId,
      position: this.position,
    };

    const { gameResult, winningCombo } = this.gameResultData;

    const updatedBoard = {
      turn: this.turn === 'x' ? 'o' : ('x' as TurnType),
      winner: gameResult ? gameResult : null,
      winning_combo: gameResult ? winningCombo : null,
    };

    console.log(`Move: ${insertedMove}`);
    console.log(`Board: ${updatedBoard}`);

    try {
      await addMove(insertedMove);

      await updateBoard(updatedBoard, this.boardId);

      return { success: true };
    } catch (error) {
      console.log(`Error ${error}`);
      throw error;
    }
  }

  private processingWinner() {
    let winner: GameResultType = '';
    let winningCombo: WinningCombinationType = [0, 0, 0];

    const isWinner = WIN_MOVE_MATRIX.some(combo => {
      const [id1, id2, id3] = combo;
      const marks: MarksType = [
        this.boardState[id1],
        this.boardState[id2],
        this.boardState[id3],
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

    this.winnerData = { isWinner, winner, winningCombo };
  }

  private finishGame() {
    this.movesList.forEach(({ position, user_id }: MoveType) => {
      this.boardState[position] = user_id === this.firstUserId ? 'x' : 'o';
    });

    this.boardState[this.position] = this.turn;

    this.processingWinner();

    const { isWinner, winner, winningCombo } = this.winnerData;

    let gameResult: GameResultType = (isWinner && winner) || '';

    if (this.boardState.every(mark => !!mark) && !winner) {
      gameResult = 'draw';
    }

    this.gameResultData = { gameResult, winningCombo };
  }
}
