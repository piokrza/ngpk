import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ctrl-details',
  template: `
    <div class="flex">
      <div class="w-3rem mr-2">
        <img [src]="icon" alt="icon" />
      </div>

      <div>
        <div>{{ amount }}</div>
        <small>{{ name }}</small>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class DetailsComponent {
  @Input() icon?: string;
  @Input() amount?: string;
  @Input() name?: string;
}