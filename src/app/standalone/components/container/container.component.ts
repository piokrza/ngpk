import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ctrl-container',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="rounded-xl h-full p-6 overflow-y-auto">
      <ng-content></ng-content>
    </section>
  `,
})
export class ContainerComponent {}
