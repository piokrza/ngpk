import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PrimeIcons } from 'primeng/api';

import { Note } from '#pages/dashboard/features/tasker/models';

@Component({
  selector: 'ctrl-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesComponent {
  @Input({ required: true }) notes!: Note[];

  @Output() removeNote = new EventEmitter<string>();

  public readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
}
