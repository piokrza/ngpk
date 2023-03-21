import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IncomesActions, IncomesSelectors } from '@app/store/incomes';
import { CashFlow } from '@common/models/cash-flow.model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'ctrl-incomes-view',
  templateUrl: './incomes-view.component.html',
  styleUrls: ['./incomes-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncomesViewComponent {
  private store: Store = inject(Store);

  public onSubmit(incomeData: CashFlow): void {
    console.log(incomeData);
  }
}
