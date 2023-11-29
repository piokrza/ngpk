import { CommonModule } from '@angular/common';
import { NgModule, Provider } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TabViewModule } from 'primeng/tabview';

import { CashFlowComponent } from '#cash-flow/.';
import {
  AddFormComponent,
  DetailsComponent,
  DetailsBoxComponent,
  DetailsListComponent,
  HeadingComponent,
  PanelComponent,
  UpdateFormComponent,
} from '#cash-flow/components';
import { CashFlowFacade } from '#cash-flow/data-access';
import { CategoryLabelPipe } from '#cash-flow/pipes';
import { IconPipe, TimestampToDatePipe } from '#shared/pipes';

const routes: Routes = [{ path: '', component: CashFlowComponent }];

const declarations = [
  DetailsComponent,
  DetailsBoxComponent,
  DetailsListComponent,
  AddFormComponent,
  HeadingComponent,
  PanelComponent,
  UpdateFormComponent,
  CashFlowComponent,
];
const imports = [
  RouterModule.forChild(routes),
  CommonModule,
  CardModule,
  InputTextareaModule,
  InputTextModule,
  InputNumberModule,
  TranslateModule,
  DropdownModule,
  CalendarModule,
  ReactiveFormsModule,
  DataViewModule,
  ProgressSpinnerModule,
  DividerModule,
  TimestampToDatePipe,
  IconPipe,
  CategoryLabelPipe,
  TabViewModule,
];
const providers: Provider[] = [CashFlowFacade];

@NgModule({ declarations, imports, providers })
export default class CashFlowModule {}
