import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ctrl-cash-flow-heading',
  template: `
    <p-card>
      <h3 class="text-center text-2xl">
        Total {{ isIncomeMode ? 'income:' : 'expences:' }}
        <span [ngClass]="{ 'text-green-600': isIncomeMode, 'text-red-600': !isIncomeMode }">
          {{ amount ? amount : 0 }} PLN
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
