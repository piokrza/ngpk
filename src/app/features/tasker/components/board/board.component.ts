import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

import { AppPaths } from '#core/enums';
import { connectState } from '#core/utils';
import { Task } from '#tasker/models';
import { TaskerSelectors } from '#tasker/store';

const imports = [TranslateModule, DragDropModule, ButtonModule];

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

  readonly state = connectState(this.destroyRef, {
    board: this.store.select(TaskerSelectors.activeBoard),
  });

  readonly todos: Task[] = [...(this.state.board?.todo ?? [])];
  readonly doing: Task[] = [...(this.state.board?.doing ?? [])];
  readonly done: Task[] = [...(this.state.board?.done ?? [])];

  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;

  ngOnInit(): void {
    if (!this.state.board) this.router.navigate([AppPaths.TASKER]);
  }

  onDrop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  navigateBack(): void {
    this.location.back();
  }
}
