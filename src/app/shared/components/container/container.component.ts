import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ctrl-container',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="h-full p-3 xl:p-5">
      <div class="rounded-xl h-full p-6 overflow-y-auto inner">
        <ng-content></ng-content>
      </div>
    </section>
  `,
})
export class ContainerComponent {}
