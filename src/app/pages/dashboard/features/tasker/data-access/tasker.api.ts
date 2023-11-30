import { Injectable, inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable, combineLatest, tap } from 'rxjs';

import { Collection } from '#common/enums';
import { Note, Task, TaskStep, ToggleIsStepCompletePayload } from '#tasker/models';

@Injectable({ providedIn: 'root' })
export class TaskerApi {
  private readonly angularFirestore: AngularFirestore = inject(AngularFirestore);

  public loadTaskerUserData$(uid: string): Observable<{ tasks: Task[]; notes: Note[] }> {
    const tasks$: AngularFirestoreCollection<Task> = this.angularFirestore.collection<Task>(Collection.TASKS, (ref) => {
      return ref.where('uid', '==', uid);
    });

    const notes$: AngularFirestoreCollection<Note> = this.angularFirestore.collection<Note>(Collection.NOTES, (ref) => {
      return ref.where('uid', '==', uid);
    });

    return combineLatest({
      tasks: tasks$.valueChanges({ idField: 'id' }),
      notes: notes$.valueChanges({ idField: 'id' }),
    });
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

  public addNote(note: Note): Promise<DocumentReference<Note>> {
    const notesCollection: AngularFirestoreCollection<Note> = this.angularFirestore.collection<Note>(Collection.NOTES);
    return notesCollection.add(note);
  }

  public removeTask(taskId: string): Promise<void> {
    return this.getTask(taskId).delete();
  }

  public removeNote(noteId: string): Promise<void> {
    return this.getNote(noteId).delete();
  }

  private getTask(taskId: string): AngularFirestoreDocument<Task> {
    return this.angularFirestore.collection(Collection.TASKS).doc(taskId);
  }

  private getNote(noteId: string): AngularFirestoreDocument<Note> {
    return this.angularFirestore.collection(Collection.NOTES).doc(noteId);
  }
}
