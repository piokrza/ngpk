import { Injectable, inject } from '@angular/core';
import { EMPTY, Observable, catchError, finalize, tap } from 'rxjs';

import { Board } from '#tasker/models';
import { BoardsApiService } from '#tasker/services';
import { BoardsStore } from '#tasker/state';

@Injectable()
export class BoardsService {
  private readonly boardsStore = inject(BoardsStore);
  private readonly boardsApiService = inject(BoardsApiService);

  loadBoards$(uid: string): Observable<Board[]> {
    this.boardsStore.update('isLoading', true);

    return this.boardsApiService.loadBoards$(uid).pipe(
      tap((boards) => this.boardsStore.update('boards', boards)),
      catchError((): Observable<never> => EMPTY),
      finalize(() => this.boardsStore.update('isLoading', false))
    );
  }
}
