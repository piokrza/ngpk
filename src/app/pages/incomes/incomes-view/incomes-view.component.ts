import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CashFlow } from '@common/models/cash-flow.model';
import { Store } from '@ngrx/store';
import { IncomesActions, IncomesSelectors } from '@store/incomes';
import { Observable } from 'rxjs';

@Component({
  selector: 'ctrl-incomes-view',
  templateUrl: './incomes-view.component.html',
  styleUrls: ['./incomes-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncomesViewComponent {
  private store: Store = inject(Store);

  public incomes$: Observable<CashFlow[]> = this.store.select(IncomesSelectors.incomes);

  public onSubmit(incomeData: CashFlow): void {
    this.store.dispatch(IncomesActions.addIncome({ income: incomeData }));
  }
}
