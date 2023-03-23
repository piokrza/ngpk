import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CashFlowModule } from '@features/cash-flow/cash-flow.module';
import { ExpensesRoutingModule } from '@expenses/expenses-routing.module';
import { ExpensesViewComponent } from '@expenses/expenses-view/expenses-view.component';
import { UiModule } from '@features/ui/ui.module';

// PrimeNg
import { DividerModule } from 'primeng/divider';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

const declarations: Array<any> = [ExpensesViewComponent];
const imports: Array<any> = [
  CommonModule,
  ExpensesRoutingModule,
  CashFlowModule,
  DividerModule,
  ConfirmDialogModule,
  UiModule,
];

@NgModule({ declarations, imports })
export class ExpensesModule {}
