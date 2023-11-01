import { Injectable, inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

import { Collection } from '#common/enums';
import { Task } from '#features/tasker/models';

@Injectable({ providedIn: 'root' })
export class TaskerApi {
  private readonly angularFirestore: AngularFirestore = inject(AngularFirestore);

  public loadUserCashFlowData$(uid: string): Observable<Task[]> {
    const tasks$: AngularFirestoreCollection<Task> = this.angularFirestore.collection<Task>(Collection.TASKS, (ref) =>
      ref.where('uid', '==', uid)
    );

    return tasks$.valueChanges({ idField: 'id' });
  }
}
