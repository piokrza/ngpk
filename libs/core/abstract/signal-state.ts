import { Signal, WritableSignal, signal } from '@angular/core';

export abstract class SignalState<T extends object> {
  constructor(private readonly initialState: T) {}

  readonly #state: WritableSignal<T> = signal(this.initialState);

  get state(): Signal<T> {
    return this.#state.asReadonly();
  }

  update<K extends keyof T>(key: K, value: T[K]): void {
    this.#state.update((prevState: T) => ({ ...prevState, [key]: value }));
  }

  clear(): void {
    this.#state.set(this.initialState);
  }
}
