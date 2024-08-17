import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';

import { TodoComponent } from '@ngpk/playground/component/crud';
import { Todo } from '@ngpk/playground/model';
import { TodoFileterPipe } from '@ngpk/playground/pipe';

const imports = [PanelModule, TabViewModule, ButtonModule, NgClass, InputTextModule, FormsModule, TodoFileterPipe, TodoComponent];

@Component({
  selector: 'ngpk-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports,
})
export class HomeComponent {
  todoName = '';
  isEditing = false;

  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;
  todos: Todo[] = [
    {
      id: Math.random() * 999999,
      name: 'obiad',
      status: 'undone',
    },
    {
      id: Math.random() * 999999,
      name: 'trening',
      status: 'undone',
    },
    {
      id: Math.random() * 999999,
      name: 'zakupy',
      status: 'done',
    },
    {
      id: Math.random() * 999999,
      name: 'posprzatac',
      status: 'undone',
    },
  ];

  removeTodo(id: number): void {
    this.todos = this.todos.filter((t) => t.id !== id);
  }

  addTodo(): void {
    if (!this.todoName) return;

    const newTodo: Todo = {
      name: this.todoName,
      id: Math.random() * 999999,
      status: 'undone',
    };

    this.todos = [...this.todos, newTodo];
    this.todoName = '';
    this.isEditing = false;
  }
}
