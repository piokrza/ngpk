import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CashFlowModule } from '@features/cash-flow/cash-flow.module';
import { ExpensesRoutingModule } from '@expenses/expenses-routing.module';
import { ExpensesViewComponent } from '@expenses/expenses-view/expenses-view.component';

const declarations: Array<any> = [ExpensesViewComponent];
const imports: Array<any> = [CommonModule, ExpensesRoutingModule, CashFlowModule];

@NgModule({ declarations, imports })
export class ExpensesModule {}
