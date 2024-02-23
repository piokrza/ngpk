import { Injectable } from '@angular/core';

import { Store } from '#core/abstracts';
import { BoardsState } from '#tasker/models';

const initialState: BoardsState = {
  boards: [],
  isLoading: false,
};

@Injectable()
export class BoardsStore extends Store<BoardsState> {
  constructor() {
    super(initialState);
  }
}
