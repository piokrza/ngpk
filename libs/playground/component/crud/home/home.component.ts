import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

const imports = [MatButtonModule];

@Component({
  selector: 'ngpk-home',
  template: ` <button mat-button>Basic</button>

    <h1>value: {{ value() }}</h1>`,
  standalone: true,
  imports,
})
export class HomeComponent {
  constructor() {
    setInterval(() => {
      this.value.update((v) => (v += 1));
    }, 1000);
  }

  readonly value = signal(0);
}
