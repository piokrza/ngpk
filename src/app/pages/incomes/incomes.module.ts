import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IncomeDetailsComponent } from '@incomes/components/income-details/income-details.component';
import { IncomeDetailsBoxComponent } from '@incomes/components/income-details-box/income-details-box.component';
import { IncomeDetailsListComponent } from '@incomes/components/income-details-list/income-details-list.component';
import { IncomeFormComponent } from '@incomes/components/income-form/income-form.component';
import { IncomesRoutingModule } from '@incomes/incomes-routing.module';
import { IncomesViewComponent } from '@incomes/incomes-view/incomes-view.component';

// PrimeNg
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

const declarations: Array<any> = [
  IncomesViewComponent,
  IncomeFormComponent,
  IncomeDetailsComponent,
  IncomeDetailsListComponent,
  IncomeDetailsBoxComponent,
];

const imports: Array<any> = [
  CommonModule,
  IncomesRoutingModule,
  CardModule,
  InputTextModule,
  InputNumberModule,
  ReactiveFormsModule,
  InputTextareaModule,
  CalendarModule,
  DropdownModule,
];

@NgModule({ declarations, imports })
export class IncomesModule {}
