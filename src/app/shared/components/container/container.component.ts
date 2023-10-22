import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ctrl-container',
  styleUrls: ['./container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  template: `
    <section class="container h-full p-3 xl:p-5">
      <div class="rounded p-4 container__inner">
        <ng-content />
      </div>
    </section>
  `,
})
export class ContainerComponent {}
