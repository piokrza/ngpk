import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CashFlowDetailsComponent } from '@features/cash-flow/components/cash-flow-details/cash-flow-details.component';
import { CashFlowDetailsBoxComponent } from '@features/cash-flow/components/cash-flow-details-box/cash-flow-details-box.component';
import { CashFlowDetailsListComponent } from '@features/cash-flow/components/cash-flow-details-list/cash-flow-details-list.component';
import { CashFlowFormComponent } from '@features/cash-flow/components/cash-flow-form/cash-flow-form.component';
import { CashFlowHeadingComponent } from '@features/cash-flow/components/cash-flow-heading/cash-flow-heading.component';
import { CashFlowViewComponent } from '@features/cash-flow/components/cash-flow-view/cash-flow-view.component';

// PrimeNg
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DividerModule } from 'primeng/divider';

const declarations: Array<any> = [
  CashFlowDetailsComponent,
  CashFlowDetailsBoxComponent,
  CashFlowDetailsListComponent,
  CashFlowFormComponent,
  CashFlowHeadingComponent,
  CashFlowViewComponent,
];
const imports: Array<any> = [
  CommonModule,
  CardModule,
  InputTextareaModule,
  InputTextModule,
  InputNumberModule,
  DropdownModule,
  CalendarModule,
  ReactiveFormsModule,
  DataViewModule,
  DividerModule,
];
const exports: Array<any> = [...declarations];

@NgModule({ declarations, imports, exports })
export class CashFlowModule {}
