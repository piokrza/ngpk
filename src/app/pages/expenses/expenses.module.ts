import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DividerModule } from 'primeng/divider';

import { CashFlowModule } from '#features/cash-flow';
import { ExpensesRoutingModule, ExpensesViewComponent } from '#pages/expenses';
import { UiModule } from '#shared/ui';

const declarations = [ExpensesViewComponent];
const imports = [CommonModule, ExpensesRoutingModule, CashFlowModule, DividerModule, UiModule];

@NgModule({ declarations, imports })
export class ExpensesModule {}
