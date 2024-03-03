import { Injectable, inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable, switchMap } from 'rxjs';

import { Collection } from '#core/enums';
import { AddTaskPayload, Board, Task, TaskList } from '#tasker/models';

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
      .add({ name, uid, tasksLists: [], id: this.angularFirestore.createId() } satisfies Board);
  }

  addTaskList$(boardId: string, taskListName: string): Observable<void> {
    const boardRef = this.getBoardById(boardId);
    return boardRef.get().pipe(
      switchMap((boardData) => {
        return boardRef.update({
          tasksLists: [
            ...(boardData.data()?.tasksLists ?? []),
            { id: this.angularFirestore.createId(), name: taskListName, tasks: [] } satisfies TaskList,
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
        const filteredTaskLists: TaskList[] = (boardData.data()?.tasksLists ?? []).filter(({ id }) => id === taskListId);
        return boardRef.update({ tasksLists: filteredTaskLists });
      })
    );
  }

  addTask$(payload: AddTaskPayload): Observable<void> {
    const boardRef = this.getBoardById(payload.boardId);

    return boardRef.get().pipe(
      switchMap((boardData) => {
        return boardRef.update({
          tasksLists: this.addTaskToTaskList(boardData.data()?.tasksLists ?? [], payload),
        });
      })
    );
  }

  private getBoardById(boardId: string): AngularFirestoreDocument<Board> {
    return this.angularFirestore.collection<Board>(Collection.BOARDS).doc(boardId);
  }

  private addTaskToTaskList(tasksLists: TaskList[], payload: AddTaskPayload): TaskList[] {
    return tasksLists.map((taskList) => {
      if (taskList.id === payload.taskListId) {
        const newTask: Task = {
          description: '',
          name: payload.taskName,
          listId: payload.taskListId,
          id: this.angularFirestore.createId(),
        };

        return { ...taskList, tasks: [...taskList.tasks, newTask] };
      }

      return taskList;
    });
  }
}
