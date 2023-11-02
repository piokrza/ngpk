import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Provider, inject } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';

import { TaskerModule } from '#features/tasker';
import { TaskerDataset } from '#features/tasker/models';
import { TaskerFacade } from '#pages/dashboard/pages/tasker';

const imports = [TaskerModule, NgIf, AsyncPipe];
const providers: Provider[] = [TaskerFacade];

@UntilDestroy()
@Component({
  selector: 'ctrl-tasker',
  template: `
    <ng-container *ngIf="dataset$ | async as dataset">
      <ctrl-tasker-panel
        (addTask)="onAddTask()"
        (removeTask)="onRemoveTask($event)"
        (toggleIsTaskComplete)="onToggleIsTaskComplete($event)"
        [isLoading]="dataset.isLoading"
        [tasks]="dataset.tasks" />
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers,
  imports,
})
export default class TaskerComponent {
  private readonly taskerFacade: TaskerFacade = inject(TaskerFacade);

  public readonly dataset$: Observable<TaskerDataset> = this.taskerFacade.taskerDataset$;

  public onAddTask(): void {
    this.taskerFacade.addTask$().pipe(untilDestroyed(this)).subscribe();
  }

  public onRemoveTask(taskId: string): void {
    this.taskerFacade.removeTask(taskId);
  }

  public onToggleIsTaskComplete(taskId: string): void {
    this.taskerFacade.toggleIsTaskComplete(taskId);
  }
}
