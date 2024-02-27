import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

import { Collection } from '#core/enums';
import { Board } from '#tasker/models';

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

  async addBoard(name: string, uid: string) {
    const newBoard: Board = { name, uid, todo: [], doing: [], done: [], id: this.angularFirestore.createId() };

    return await this.angularFirestore.collection<Board>(Collection.BOARDS).add(newBoard);
  }
}
