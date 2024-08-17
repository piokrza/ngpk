import { computed } from '@angular/core';
import { signalStore, withState, withMethods, patchState, withComputed } from '@ngrx/signals';

import { Todo } from '@ngpk/playground/model';

interface State {
  todos: Todo[];
}

const initialState: State = {
  todos: [],
};

export const TodosStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    addTodo(name: string): void {
      const updatedTodos: Todo[] = [...store.todos(), { name, id: Math.random() * 999999, completed: false }];
      patchState(store, { todos: updatedTodos });
    },
    removeTodo(id: number): void {
      const updatedTodos = store.todos().filter((todo) => todo.id !== id);
      patchState(store, { todos: updatedTodos });
    },
    toggleIsCompleted(id: number, completed: boolean): void {
      const updatedTodos = store.todos().map((todo) => {
        if (todo.id === id) return { ...todo, completed };
        return todo;
      });
      patchState(store, { todos: updatedTodos });
    },
  })),
  withComputed((store) => ({
    completed: computed(() => store.todos().filter((t) => t.completed)),
    unCompleted: computed(() => store.todos().filter((t) => !t.completed)),
  }))
);
