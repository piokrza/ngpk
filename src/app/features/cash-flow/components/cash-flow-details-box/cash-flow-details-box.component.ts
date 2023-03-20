import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ctrl-cash-flow-details-box',
  template: `
    <div class="flex flex-wrap gap-3">
      <i [class]="'pi pi-' + iconName"></i>
      <span>{{ detail }}</span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CashFlowDetailsBoxComponent {
  @Input() public detail!: string;
  @Input() public iconName!: string;
}
