import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { PrimeIcons } from 'primeng/api';

import { TaskerService } from '#tasker/data-access';
import { Note } from '#tasker/models';

@Component({
  selector: 'ctrl-note',
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteComponent {
  private readonly taskerService: TaskerService = inject(TaskerService);

  @Input({ required: true }) note!: Note;

  @Output() removeNote = new EventEmitter<string>();

  public isTaskContentVisible = false;
  public readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;

  public toggleNoteVisibility(): void {
    this.isTaskContentVisible = !this.isTaskContentVisible;
    this.taskerService.setIsVisibleData(this.note.id, this.isTaskContentVisible);
  }
}
