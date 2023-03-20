import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IncomesRoutingModule } from '@incomes/incomes-routing.module';
import { IncomesViewComponent } from '@incomes/incomes-view/incomes-view.component';
import { IncomeFormComponent } from '@incomes/components/income-form/income-form.component';
import { IncomeDetailsComponent } from '@incomes/components/income-details/income-details.component';
import { IncomeDetailsListComponent } from '@incomes/components/income-details-list/income-details-list.component';
import { SeparatorComponent } from '@standalone/components/separator/separator.component';

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
  SeparatorComponent,
];

@NgModule({ declarations, imports })
export class IncomesModule {}
