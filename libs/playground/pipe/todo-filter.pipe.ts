import { Todo } from '../model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'todoFilter', standalone: true })
export class TodoFileterPipe implements PipeTransform {
  transform(todos: Todo[], status: Todo['status']) {
    return todos.filter((todo) => todo.status === status);
  }
}
