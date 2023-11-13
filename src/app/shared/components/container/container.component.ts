import { Component, Input } from '@angular/core';

@Component({
  selector: 'ctrl-container',
  styleUrl: './container.component.scss',
  template: `
    <section [class]="['container', 'h-full', 'p-3', styleClass]">
      <div class="rounded p-3 container__inner">
        <ng-content />
      </div>
    </section>
  `,
  standalone: true,
})
export class ContainerComponent {
  @Input() styleClass?: string;
}
