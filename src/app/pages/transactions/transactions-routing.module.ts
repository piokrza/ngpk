import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsViewComponent } from '@transactions/transactions-view/transactions-view.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionsViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionsRoutingModule {}
