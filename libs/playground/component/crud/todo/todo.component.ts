import { Component, input, output } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

import { Todo } from '@ngpk/playground/model';

const imports = [ButtonModule];

@Component({
  selector: 'ngpk-todo',
  template: `
  @let t = todo();
    <div class="flex justify-content-between align-items-center">
      <span> {{t.name}}</span>
      <div class="flex gap-1">
        <p-button
          [severity]="t.status === 'done' ? 'help' : 'success'"
          [icon]="t.status === 'done' ? PrimeIcons.MINUS : PrimeIcons.PLUS"
          (onClick)="toggleTodoStatus.emit(this.todo().status === 'done' ? 'undone' : 'done')" />
        <p-button severity="secondary" [icon]="PrimeIcons.TIMES" (onClick)="removeTodo.emit(t.id)" />
      </div>
    </div>
  `,
  standalone: true,
  imports,
})
export class TodoComponent {
  readonly todo = input.required<Todo>();

  readonly removeTodo = output<number>();
  readonly toggleTodoStatus = output<Todo['status']>();

  readonly PrimeIcons = PrimeIcons;
}
