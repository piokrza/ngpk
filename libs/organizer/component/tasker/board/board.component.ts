import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

import { connectState } from '@ngpk/core/util';
import { AddTaskPayload, DeleteTaskPayload, Task } from '@ngpk/organizer/model';
import { BoardsFacadeService } from '@ngpk/organizer/service';
import { ContainerComponent, AddItemBtnComponent } from '@ngpk/shared-ui/components';

const imports = [TranslateModule, DragDropModule, ButtonModule, ContainerComponent, AddItemBtnComponent];

@Component({
  selector: 'ngpk-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class BoardComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly boardsFacadeService = inject(BoardsFacadeService);

  readonly state = connectState(this.destroyRef, this.boardsFacadeService.boardState);

  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;

  ngOnInit(): void {
    this.boardsFacadeService.getActiveBoard(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  onDrop(event: CdkDragDrop<string>): void {
    this.boardsFacadeService.dragDropTask({
      boardId: this.state.board.id,
      task: event.item.data satisfies Task,
      nextTaskListId: event.container.data,
      prevTaskListId: event.previousContainer.data,
    });
  }

  navigateBack(): void {
    this.boardsFacadeService.navigateBack();
  }

  deleteBoard(): void {
    this.boardsFacadeService.deleteBoard(this.state.board.id);
  }

  addTaskList(taskListName: string): void {
    this.boardsFacadeService.addTaskList(this.state.board.id, taskListName);
  }

  deleteTaskList(taskListId: string): void {
    this.boardsFacadeService.deleteTaskList(this.state.board.id, taskListId);
  }

  addTask(taskName: string, taskListId: string): void {
    const payload: AddTaskPayload = { boardId: this.state.board.id, taskListId, taskName };
    this.boardsFacadeService.addTask(payload);
  }

  deleteTask(taskId: string, taskListId: string): void {
    const payload: DeleteTaskPayload = { boardId: this.state.board.id, taskId, taskListId };
    this.boardsFacadeService.deleteTask(payload);
  }
}
