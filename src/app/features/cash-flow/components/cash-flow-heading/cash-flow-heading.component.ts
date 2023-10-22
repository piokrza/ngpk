import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ctrl-cash-flow-heading',
  styleUrls: ['./cash-flow-heading.component.scss'],
  template: `
    <p-card>
      <h3 class="heading">
        Total {{ isIncomeMode ? 'income:' : 'expences:' }}
        <span [ngClass]="{ 'text--success': isIncomeMode, 'text--danger': !isIncomeMode }">
          {{ amount ? (amount | number) : 0 }} PLN
        </span>
      </h3>
    </p-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CashFlowHeadingComponent {
  @Input() public isIncomeMode!: boolean;
  @Input() public amount!: number;
}
