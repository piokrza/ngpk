import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardViewComponent } from '#pages/dashboard';
import { DashobardPaths } from '#pages/dashboard/enums';
import { DashboardRedirectGuard } from '#pages/dashboard/guards';

const routes: Routes = [
  {
    path: '',
    component: DashboardViewComponent,
    canActivate: [DashboardRedirectGuard],
    children: [
      {
        path: DashobardPaths.OVERVIEW,
        loadComponent: () => import('#pages/dashboard/pages/overview/overview.component'),
      },
      {
        path: DashobardPaths.CASH_FLOW,
        loadChildren: () => import('#pages/dashboard/pages/cash-flow/cash-flow.module'),
      },
      {
        path: DashobardPaths.SETTINGS,
        loadChildren: () => import('#pages/dashboard/pages/settings/settings.module'),
      },
      {
        path: DashobardPaths.TASKER,
        loadChildren: () => import('#pages/dashboard/pages/tasker/tasker.module'),
      },
    ],
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class DashboardRoutingModule {}
