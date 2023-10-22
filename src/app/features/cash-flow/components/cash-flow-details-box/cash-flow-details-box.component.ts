import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ctrl-cash-flow-details-box',
  styleUrls: ['./cash-flow-details-box.component.scss'],
  template: `
    <div class="gap-2 box">
      <i [class]="'mr-1 pi pi-' + iconName"></i>
      <span>{{ detail }}</span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CashFlowDetailsBoxComponent {
  @Input() public detail!: string;
  @Input() public iconName!: string;
}
