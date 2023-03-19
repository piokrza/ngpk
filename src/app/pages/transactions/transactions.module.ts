import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsViewComponent } from './transactions-view/transactions-view.component';


@NgModule({
  declarations: [
    TransactionsViewComponent
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule
  ]
})
export class TransactionsModule { }
