import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

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

  @Output() public removeNote = new EventEmitter<string>();

  isTaskContentVisible = false;
  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
  readonly DateFormats: typeof DateFormats = DateFormats;

  public toggleNoteVisibility(): void {
    this.isTaskContentVisible = !this.isTaskContentVisible;
  }
}
