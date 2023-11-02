import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, combineLatest } from 'rxjs';

import { AddTaskFormComponent } from '#features/tasker/components';
import { Task, TaskerDataset } from '#features/tasker/models';
import { TaskerSelectors } from '#store/tasker';

@Injectable()
export class TaskerFacade {
  private readonly store: Store = inject(Store);
  private readonly dialogService: DialogService = inject(DialogService);
  private readonly translateService: TranslateService = inject(TranslateService);
  private readonly confirmationService: ConfirmationService = inject(ConfirmationService);

  public get taskerDataset$(): Observable<TaskerDataset> {
    return combineLatest({
      tasks: this.store.select(TaskerSelectors.tasks),
      isLoading: this.store.select(TaskerSelectors.isLoading),
    });
  }

  public editTask$(task: Task) {
    const dialogRef: DynamicDialogRef = this.dialogService.open(AddTaskFormComponent, {
      header: this.translateService.instant('tasker.updateTask'),
      style: { width: '90%', maxWidth: '600px' },
      data: task,
    });

    dialogRef;
  }

  public removeTask$(taskId: string) {
    taskId;
  }
}
