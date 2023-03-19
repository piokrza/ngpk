import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncomesViewComponent } from '@incomes/incomes-view/incomes-view.component';

const routes: Routes = [
  {
    path: '',
    component: IncomesViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncomesRoutingModule {}
