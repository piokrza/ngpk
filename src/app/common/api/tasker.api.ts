import { Injectable, inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

import { Collection } from '#common/enums';
import { Task } from '#features/tasker/models';

@Injectable({ providedIn: 'root' })
export class TaskerApi {
  private readonly angularFirestore: AngularFirestore = inject(AngularFirestore);

  public loadTaskerUserData$(uid: string): Observable<Task[]> {
    const tasks$: AngularFirestoreCollection<Task> = this.angularFirestore.collection<Task>(Collection.TASKS, (ref) => {
      return ref.where('uid', '==', uid);
    });

    return tasks$.valueChanges({ idField: 'id' });
  }

  public addTask(task: Task): Promise<DocumentReference<Task>> {
    const tasksCollection: AngularFirestoreCollection<Task> = this.angularFirestore.collection<Task>(Collection.TASKS);

    return tasksCollection.add(task);
  }

  public removeTask(taskId: string): Promise<void> {
    const taskDocument: AngularFirestoreDocument<Task> = this.angularFirestore.collection(Collection.TASKS).doc(taskId);

    return taskDocument.delete();
  }
}
