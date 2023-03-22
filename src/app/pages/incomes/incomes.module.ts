import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CashFlowModule } from '@features/cash-flow/cash-flow.module';
import { IncomesRoutingModule } from '@incomes/incomes-routing.module';
import { IncomesViewComponent } from '@incomes/incomes-view/incomes-view.component';

// PrimeNg
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';

const declarations: Array<any> = [IncomesViewComponent];
const imports: Array<any> = [CommonModule, IncomesRoutingModule, CardModule, CashFlowModule, DividerModule];

@NgModule({ declarations, imports })
export class IncomesModule {}
