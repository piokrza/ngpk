import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ctrl-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteComponent {}
