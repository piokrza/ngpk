import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SelectButtonChangeEvent } from 'primeng/selectbutton';

import { LabelWithData } from '#common/models';
import { Note, Task, TaskFilter, ToggleIsStepCompletePayload } from '#pages/dashboard/features/tasker/models';

@Component({
  selector: 'ctrl-tasker-panel',
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelComponent {
  private readonly translate: TranslateService = inject(TranslateService);

  @Input({ required: true }) tasks!: Task[] | null;
  @Input({ required: true }) notes!: Note[] | null;
  @Input({ required: true }) isLoading!: boolean;
  @Input({ required: true }) filter!: TaskFilter;

  @Output() addTask = new EventEmitter<void>();
  @Output() removeTask = new EventEmitter<string>();
  @Output() filterChange = new EventEmitter<TaskFilter>();
  @Output() toggleIsTaskComplete = new EventEmitter<string>();
  @Output() toggleIsStepComplete = new EventEmitter<ToggleIsStepCompletePayload>();

  @Output() addNote = new EventEmitter<void>();
  @Output() removeNote = new EventEmitter<string>();

  public readonly filters: LabelWithData<TaskFilter>[] = [
    { label: this.translate.instant('tasker.filter.all'), data: 'all' },
    { label: this.translate.instant('tasker.filter.completed'), data: 'completed' },
    { label: this.translate.instant('tasker.filter.notCompleted'), data: 'notCompleted' },
  ];

  public onFilterChange({ value }: SelectButtonChangeEvent) {
    this.filterChange.emit(value as TaskFilter);
  }
}
