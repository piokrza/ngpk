import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { first } from 'rxjs';

import { PrimeIcons } from 'primeng/api';
import { SelectButtonChangeEvent } from 'primeng/selectbutton';
import { TabViewChangeEvent } from 'primeng/tabview';
import { ToggleButtonChangeEvent } from 'primeng/togglebutton';

import { LabeledData } from '#core/models';
import { connectState } from '#core/utils';
import { Note, Task, TaskFilter, ToggleIsStepCompletePayload } from '#tasker/models';
import { TaskerFacadeService } from '#tasker/services';

@Component({
  selector: 'org-tasker',
  templateUrl: './tasker.component.html',
  styleUrl: './tasker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskerComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly taskerFacadeService = inject(TaskerFacadeService);

  readonly state = connectState(this.destroyRef, {
    tasksData: this.taskerFacadeService.tasksData$,
    isTasksLoading: this.taskerFacadeService.isTasksLoading$,
    notesData: this.taskerFacadeService.notesData$,
    isNotesLoading: this.taskerFacadeService.isNotesLoading$,
    activeTabIndex: this.taskerFacadeService.activeTabIndex$,
  });

  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
  readonly filters: Array<LabeledData<TaskFilter>> = this.taskerFacadeService.taskFilters;

  addTask(): void {
    this.taskerFacadeService.addTask$().pipe(first()).subscribe();
  }

  editTask(task: Task): void {
    this.taskerFacadeService.editTask$(task).pipe(first()).subscribe();
  }

  removeTask(taskId: string): void {
    this.taskerFacadeService.removeTask(taskId);
  }

  toggleIsTaskComplete(taskId: string): void {
    this.taskerFacadeService.toggleIsTaskComplete(taskId);
  }

  toggleIsStepComplete(payload: ToggleIsStepCompletePayload): void {
    this.taskerFacadeService.toggleIsStepComplete(payload);
  }

  taskFilterChange({ value }: SelectButtonChangeEvent) {
    this.taskerFacadeService.onTaskFilterChange(value);
  }

  noteFilterChange({ checked }: ToggleButtonChangeEvent): void {
    this.taskerFacadeService.onNoteFilterChange(checked ? 'newest' : 'oldest');
  }

  addNote(): void {
    this.taskerFacadeService.addNote$().pipe(first()).subscribe();
  }

  editNote(note: Note): void {
    this.taskerFacadeService.editNote$(note).pipe(first()).subscribe();
  }

  removeNote(noteId: string): void {
    this.taskerFacadeService.removeNote(noteId);
  }

  onTabviewChange({ index }: TabViewChangeEvent): void {
    this.taskerFacadeService.setActiveTabIdx(index);
  }
}
