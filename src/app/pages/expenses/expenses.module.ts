import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CashFlowModule } from '#features/cash-flow/cash-flow.module';
import { UiModule } from '#features/ui/ui.module';
import { ExpensesRoutingModule, ExpensesViewComponent } from '#pages/expenses';

// PrimeNg
import { DividerModule } from 'primeng/divider';

const declarations: Array<any> = [ExpensesViewComponent];
const imports: Array<any> = [CommonModule, ExpensesRoutingModule, CashFlowModule, DividerModule, UiModule];

@NgModule({ declarations, imports })
export class ExpensesModule {}
