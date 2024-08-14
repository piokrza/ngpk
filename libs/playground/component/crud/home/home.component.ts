import { Component, signal } from '@angular/core';

@Component({
  selector: 'ngpk-home',
  template: `<h1>value: {{ value() }}</h1>`,
  standalone: true,
})
export class HomeComponent {
  constructor() {
    setInterval(() => {
      this.value.update((v) => (v += 1));
    }, 1000);
  }

  readonly value = signal(0);
}
