import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PrimeIcons } from 'primeng/api';

import { DateFormats } from '#dashboard/enums';
import { Note } from '#tasker/models';

@Component({
  selector: 'ctrl-note',
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteComponent {
  @Input({ required: true }) note!: Note;

  @Output() public removeNote = new EventEmitter<string>();

  public isTaskContentVisible = false;
  public readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
  public readonly DateFormats: typeof DateFormats = DateFormats;

  public toggleNoteVisibility(): void {
    this.isTaskContentVisible = !this.isTaskContentVisible;
  }
}
