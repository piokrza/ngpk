import { Injectable, inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable, tap } from 'rxjs';

import { Collection } from '#common/enums';
import { Task, TaskStep, ToggleIsStepCompletePayload } from '#pages/dashboard/pages/tasker/models';

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

  public toggleIsTaskComplete(taskId: string) {
    const taskRef: AngularFirestoreDocument<Task> = this.getTask(taskId);

    return taskRef.get().pipe(
      tap((task) => {
        if (task.exists) {
          const isTaskComplete = task.data()?.isComplete;
          taskRef.update({ isComplete: !isTaskComplete });
        }
      })
    );
  }

  public toggleIsStepComplete(payload: ToggleIsStepCompletePayload) {
    const taskRef: AngularFirestoreDocument<Task> = this.getTask(payload.taskId);

    return taskRef.get().pipe(
      tap((task) => {
        if (task.exists) {
          const taskSteps: TaskStep[] = task.data()?.steps ?? [];
          const stepToUpdate: TaskStep | undefined = taskSteps.find(({ id }) => id === payload.stepId);

          if (stepToUpdate) {
            stepToUpdate.isComplete = !stepToUpdate.isComplete;
            taskRef.update({ steps: taskSteps });
          }
        }
      })
    );
  }

  public removeTask(taskId: string): Promise<void> {
    return this.getTask(taskId).delete();
  }

  private getTask(taskId: string): AngularFirestoreDocument<Task> {
    return this.angularFirestore.collection(Collection.TASKS).doc(taskId);
  }
}
