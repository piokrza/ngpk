import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ctrl-transactions-view',
  templateUrl: './transactions-view.component.html',
  styleUrls: ['./transactions-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsViewComponent {}
