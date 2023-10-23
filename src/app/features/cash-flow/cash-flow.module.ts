import { CommonModule } from '@angular/common';
import { NgModule, Provider } from '@angular/core';
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
  AddFormComponent,
  DetailsComponent,
  DetailsBoxComponent,
  DetailsListComponent,
  HeadingComponent,
  PanelComponent,
  UpdateFormComponent,
} from '#features/cash-flow/components';
import { CashFlowFormService } from '#features/cash-flow/services';
import { IconPipe, TimestampToDatePipe } from '#shared/pipes';

const declarations = [
  DetailsComponent,
  DetailsBoxComponent,
  DetailsListComponent,
  AddFormComponent,
  HeadingComponent,
  PanelComponent,
  UpdateFormComponent,
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

const providers: Array<Provider> = [CashFlowFormService];

const exports: Array<typeof PanelComponent> = [PanelComponent];

@NgModule({ declarations, imports, providers, exports })
export class CashFlowModule {}
