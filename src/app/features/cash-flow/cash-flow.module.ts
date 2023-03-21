import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CashFlowDetailsComponent } from '@features/cash-flow/components/cash-flow-details/cash-flow-details.component';
import { CashFlowDetailsBoxComponent } from '@features/cash-flow/components/cash-flow-details-box/cash-flow-details-box.component';
import { CashFlowDetailsListComponent } from '@features/cash-flow/components/cash-flow-details-list/cash-flow-details-list.component';
import { CashFlowFormComponent } from '@features/cash-flow/components/cash-flow-form/cash-flow-form.component';
import { CashFlowHeadingComponent } from '@features/cash-flow/components/cash-flow-heading/cash-flow-heading.component';

// PrimeNg
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

const declarations: Array<any> = [
  CashFlowDetailsComponent,
  CashFlowDetailsBoxComponent,
  CashFlowDetailsListComponent,
  CashFlowFormComponent,
  CashFlowHeadingComponent,
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
];
const exports: Array<any> = [...declarations];

@NgModule({ declarations, imports, exports })
export class CashFlowModule {}
