import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ctrl-add-task-form',

  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTaskFormComponent {}
