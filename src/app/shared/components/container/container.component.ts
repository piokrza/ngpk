import { Component } from '@angular/core';

@Component({
  selector: 'ctrl-container',
  styleUrls: ['./container.component.scss'],
  template: `
    <section class="container h-full p-3">
      <div class="rounded p-4 container__inner">
        <ng-content />
      </div>
    </section>
  `,
  standalone: true,
})
export class ContainerComponent {}
