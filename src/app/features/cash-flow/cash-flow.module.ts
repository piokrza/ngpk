import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import {
  CashFlowAddFormComponent,
  CashFlowDetailsComponent,
  CashFlowDetailsBoxComponent,
  CashFlowDetailsListComponent,
  CashFlowHeadingComponent,
  CashFlowPanelComponent,
  CashFlowUpdateFormComponent,
} from '#features/cash-flow/components';
import { IconPipe, TimestampToDatePipe } from '#shared/pipes';

const declarations = [
  CashFlowDetailsComponent,
  CashFlowDetailsBoxComponent,
  CashFlowDetailsListComponent,
  CashFlowAddFormComponent,
  CashFlowHeadingComponent,
  CashFlowPanelComponent,
  CashFlowUpdateFormComponent,
];

const imports = [
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
  IconPipe,
];

const exports = [...declarations];

@NgModule({ declarations, imports, exports })
export class CashFlowModule {}
