import { Injectable, inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentReference } from '@angular/fire/compat/firestore';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Observable, switchMap, tap } from 'rxjs';

import { Collection } from '#core/enums';
import { AddTaskPayload, Board, TaskList } from '#tasker/models';

@Injectable({ providedIn: 'root' })
export class BoardsApiService {
  private readonly angularFirestore = inject(AngularFirestore);

  loadBoards$(uid: string): Observable<Board[]> {
    return this.angularFirestore
      .collection<Board>(Collection.BOARDS, (ref) => {
        return ref.where('uid', '==', uid);
      })
      .valueChanges({ idField: 'id' });
  }

  async addBoard(name: string, uid: string): Promise<DocumentReference<Board>> {
    return await this.angularFirestore
      .collection<Board>(Collection.BOARDS)
      .add({ name, uid, tasksList: [], id: this.angularFirestore.createId() } satisfies Board);
  }

  addTaskList$(boardId: string, taskListName: string): Observable<void> {
    const boardRef = this.getBoardById(boardId);
    return boardRef.get().pipe(
      switchMap((boardData) => {
        return boardRef.update({
          tasksList: [
            ...(boardData.data()?.tasksList ?? []),
            { id: this.angularFirestore.createId(), name: taskListName, items: [] } satisfies TaskList,
          ],
        });
      })
    );
  }

  async deleteBoard(boardId: string): Promise<void> {
    return await this.getBoardById(boardId).delete();
  }

  deleteTaskList$(boardId: string, taskListId: string): Observable<void> {
    const boardRef = this.getBoardById(boardId);
    return boardRef.get().pipe(
      switchMap((boardData) => {
        const filteredTaskList: TaskList[] = (boardData.data()?.tasksList ?? []).filter(({ id }) => id === taskListId);
        return boardRef.update({ tasksList: filteredTaskList });
      })
    );
  }

  async addTask(payload: AddTaskPayload) {
    payload;
    // const boardRef = this.angularFirestore.collection<Board>(Collection.BOARDS).doc(payload.boardId);
  }

  private getBoardById(boardId: string): AngularFirestoreDocument<Board> {
    return this.angularFirestore.collection<Board>(Collection.BOARDS).doc(boardId);
  }
}
