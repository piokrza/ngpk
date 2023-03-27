import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CashFlowDetailsComponent } from '@features/cash-flow/components/cash-flow-details/cash-flow-details.component';
import { CashFlowDetailsBoxComponent } from '@features/cash-flow/components/cash-flow-details-box/cash-flow-details-box.component';
import { CashFlowDetailsListComponent } from '@features/cash-flow/components/cash-flow-details-list/cash-flow-details-list.component';
import { CashFlowFormComponent } from '@features/cash-flow/components/cash-flow-form/cash-flow-form.component';
import { CashFlowHeadingComponent } from '@features/cash-flow/components/cash-flow-heading/cash-flow-heading.component';
import { CashFlowPanelComponent } from '@features/cash-flow/components/cash-flow-panel/cash-flow-panel.component';
import { TimestampToDatePipe } from '@standalone/pipes/timestamp-to-date.pipe';

// PrimeNg
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

const declarations: Array<any> = [
  CashFlowDetailsComponent,
  CashFlowDetailsBoxComponent,
  CashFlowDetailsListComponent,
  CashFlowFormComponent,
  CashFlowHeadingComponent,
  CashFlowPanelComponent,
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
  ProgressSpinnerModule,
  DividerModule,
  TimestampToDatePipe,
];
const exports: Array<any> = [...declarations];

@NgModule({ declarations, imports, exports })
export class CashFlowModule {}
