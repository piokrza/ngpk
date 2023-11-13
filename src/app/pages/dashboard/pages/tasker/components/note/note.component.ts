import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ctrl-note',
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteComponent {}
