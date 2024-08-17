import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';

import { TodoComponent } from '@ngpk/playground/component/crud';
import { TodosStore } from '@ngpk/playground/state';

const imports = [PanelModule, TabViewModule, ButtonModule, NgClass, InputTextModule, FormsModule, TodoComponent];

@Component({
  selector: 'ngpk-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports,
})
export class HomeComponent {
  protected readonly todosStore = inject(TodosStore);

  todoName = '';
  isEditing = false;

  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;

  removeTodo(id: number): void {
    this.todosStore.removeTodo(id);
  }

  addTodo(): void {
    if (!this.todoName) return;
    this.todosStore.addTodo(this.todoName);
    this.todoName = '';
  }

  cancelEditing(): void {
    this.isEditing = false;
    this.todoName = '';
  }

  toggleIsTodoCompleted(id: number, status: boolean): void {
    this.todosStore.toggleIsCompleted(id, status);
  }
}
