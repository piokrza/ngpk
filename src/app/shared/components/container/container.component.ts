import { Component, Input } from '@angular/core';

@Component({
  selector: 'org-container',
  styleUrl: './container.component.scss',
  template: `
    <section [class]="['container', 'h-full', noPadding ? '' : 'p-3', styleClass]">
      <div class="container__inner">
        <ng-content />
      </div>
    </section>
  `,
  standalone: true,
})
export class ContainerComponent {
  @Input() styleClass?: string = '';
  @Input() noPadding = false;
}
