import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Provider, inject } from '@angular/core';

import { TaskerModule } from '#features/tasker';
import { Task } from '#features/tasker/models';
import { TaskerFacade } from '#pages/dashboard/pages/tasker';

const imports = [TaskerModule, NgIf, AsyncPipe];
const providers: Provider[] = [TaskerFacade];

@Component({
  selector: 'ctrl-tasker',
  template: `
    <ng-container *ngIf="dataset$ | async as dataset">
      <ctrl-tasker-panel (editTask)="onEditTask($event)" (removeTask)="onRemoveTask($event)" [tasks]="dataset.tasks" />
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers,
  imports,
})
export default class TaskerComponent {
  private readonly taskerFacade: TaskerFacade = inject(TaskerFacade);

  public readonly dataset$ = this.taskerFacade.taskerDataset$;

  public onEditTask(task: Task): void {
    this.taskerFacade.editTask$(task);
  }

  public onRemoveTask(taskId: string): void {
    this.taskerFacade.removeTask$(taskId);
  }
}
