import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';

import { Task, TaskerDataset } from '#features/tasker/models';
import { TaskerSelectors } from '#store/tasker';

@Injectable()
export class TaskerFacade {
  private readonly store: Store = inject(Store);

  public get taskerDataset$(): Observable<TaskerDataset> {
    return combineLatest({
      tasks: this.store.select(TaskerSelectors.tasks),
      isLoading: this.store.select(TaskerSelectors.isLoading),
    });
  }

  public editTask$(task: Task) {
    task;
  }

  public removeTask$(taskId: string) {
    taskId;
  }
}
