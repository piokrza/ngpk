import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardModule } from '@dashboard/dashboard.module';
import { ExpensesModule } from '@expenses/expenses.module';
import { IncomesModule } from '@incomes/incomes.module';
import { SettingsModule } from '@settings/settings.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: (): Promise<any> =>
      import('@dashboard/dashboard.module').then(({ DashboardModule }): DashboardModule => DashboardModule),
  },
  {
    path: 'incomes',
    loadChildren: (): Promise<any> =>
      import('@incomes/incomes.module').then(({ IncomesModule }): IncomesModule => IncomesModule),
  },
  {
    path: 'expenses',
    loadChildren: (): Promise<any> =>
      import('@expenses/expenses.module').then(({ ExpensesModule }): ExpensesModule => ExpensesModule),
  },
  {
    path: 'settings',
    loadChildren: (): Promise<any> =>
      import('@settings/settings.module').then(({ SettingsModule }): SettingsModule => SettingsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
