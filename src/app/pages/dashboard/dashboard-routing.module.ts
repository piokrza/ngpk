import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardViewComponent } from '#pages/dashboard';
import { DashobardPath } from '#pages/dashboard/enums';

const routes: Routes = [
  {
    path: '',
    component: DashboardViewComponent,
    children: [
      {
        path: '',
        loadComponent: (): Promise<any> => import('#pages/dashboard/pages/overview/overview.component'),
      },
      {
        path: DashobardPath.INCOMES,
        loadComponent: (): Promise<any> => import('#pages/dashboard/pages/incomes/incomes.component'),
      },
      {
        path: DashobardPath.EXPENSES,
        loadComponent: (): Promise<any> => import('#pages/dashboard/pages/expenses/expenses.component'),
      },
      {
        path: DashobardPath.SETTINGS,
        loadChildren: (): Promise<any> => import('#pages/dashboard/pages/settings/settings.module'),
      },
    ],
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class DashboardRoutingModule {}
