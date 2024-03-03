import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { filter } from 'rxjs';

import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

import { AuthSelectors } from '#auth/store';
import { AppPaths } from '#core/enums';
import { connectState } from '#core/utils';
import { ContainerComponent, AddItemBtnComponent } from '#shared/components';
import { AddTaskPayload } from '#tasker/models';
import { BoardsFacadeService } from '#tasker/services';
import { TaskerSelectors } from '#tasker/store';

const imports = [TranslateModule, DragDropModule, ButtonModule, ContainerComponent, AddItemBtnComponent];

@Component({
  selector: 'org-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class BoardComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  private readonly destroyRef = inject(DestroyRef);
  private readonly boardsFacadeService = inject(BoardsFacadeService);

  readonly state = connectState(this.destroyRef, {
    board: this.store.select(TaskerSelectors.activeBoard).pipe(filter(Boolean)),
    user: this.store.select(AuthSelectors.user).pipe(filter(Boolean)),
  });

  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;

  ngOnInit(): void {
    if (!this.state.board) this.router.navigate([AppPaths.TASKER]);
  }

  onDrop(event: CdkDragDrop<string>): void {
    event;
  }

  navigateBack(): void {
    this.location.back();
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

  deleteTask(): void {}
}
