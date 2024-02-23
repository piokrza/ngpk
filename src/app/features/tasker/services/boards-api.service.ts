import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, takeUntil } from 'rxjs';

import { Collection } from '#core/enums';
import { DbSubscriptionService } from '#core/services';
import { Board } from '#tasker/models';

@Injectable()
export class BoardsApiService {
  private readonly angularFirestore = inject(AngularFirestore);
  private readonly dbSubscriptionService = inject(DbSubscriptionService);

  loadBoards$(uid: string): Observable<Board[]> {
    return this.angularFirestore
      .collection<Board>(Collection.BOARDS, (ref) => ref.where('uid', '==', uid))
      .valueChanges({ idField: 'id' })
      .pipe(takeUntil(this.dbSubscriptionService.unsubscribe$));
  }
}
