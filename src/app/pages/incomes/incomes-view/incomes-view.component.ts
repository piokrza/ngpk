import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CashFlowPayload } from '@common/models/cash-flow-payload.model';

@Component({
  selector: 'ctrl-incomes-view',
  templateUrl: './incomes-view.component.html',
  styleUrls: ['./incomes-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncomesViewComponent {
  public onSubmit(incomeData: CashFlowPayload): void {
    console.log(incomeData);
  }
}
