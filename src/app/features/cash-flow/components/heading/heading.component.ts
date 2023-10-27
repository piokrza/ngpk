import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ctrl-heading',
  styleUrls: ['./heading.component.scss'],
  template: `
    <p-card>
      <h3 class="heading">
        {{ 'cashFlow.heading' + (isIncomeMode ? 'Incomes' : 'Expenses') | translate }}
        <span [ngClass]="{ 'text--success': isIncomeMode, 'text--danger': !isIncomeMode }">
          {{ amount ? (amount | number) : 0 }} PLN
        </span>
      </h3>
    </p-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeadingComponent {
  @Input({ required: true }) public isIncomeMode!: boolean;
  @Input({ required: true }) public amount!: number;
}
