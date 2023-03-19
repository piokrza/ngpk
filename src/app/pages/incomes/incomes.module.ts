import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncomesRoutingModule } from './incomes-routing.module';
import { IncomesViewComponent } from './incomes-view/incomes-view.component';


@NgModule({
  declarations: [
    IncomesViewComponent
  ],
  imports: [
    CommonModule,
    IncomesRoutingModule
  ]
})
export class IncomesModule { }
