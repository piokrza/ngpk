import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ctrl-container',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="rounded-xl border h-full p-6">
      <ng-content></ng-content>
    </section>
  `,
})
export class ContainerComponent {}
