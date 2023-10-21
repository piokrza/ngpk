import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CashFlowModule } from '#features/cash-flow';
import { UiModule } from '#features/ui/ui.module';
import { IncomesRoutingModule, IncomesViewComponent } from '#pages/incomes';

const declarations: Array<any> = [IncomesViewComponent];
const imports: Array<any> = [CommonModule, IncomesRoutingModule, CashFlowModule, UiModule];

@NgModule({ declarations, imports })
export class IncomesModule {}
