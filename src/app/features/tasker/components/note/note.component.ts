import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal } from '@angular/core';

import { PrimeIcons } from 'primeng/api';

import { DateFormats } from '#core/enums';
import { Note } from '#tasker/models';

@Component({
  selector: 'org-note',
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteComponent {
  @Input({ required: true }) note!: Note;

  @Output() editNote = new EventEmitter<Note>();
  @Output() removeNote = new EventEmitter<string>();

  isTaskContentVisible = signal(false);
  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
  readonly DateFormats: typeof DateFormats = DateFormats;

  toggleNoteVisibility(): void {
    this.isTaskContentVisible.update((isVisible) => !isVisible);
  }
}
