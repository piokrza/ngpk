import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ctrl-separator',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="my-6"><ng-content></ng-content></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeparatorComponent {}
