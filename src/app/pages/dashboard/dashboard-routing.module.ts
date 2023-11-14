import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '#pages/dashboard';
import { DashobardPaths } from '#pages/dashboard/enums';
import { DashboardRedirectGuard } from '#pages/dashboard/guards';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [DashboardRedirectGuard],
    children: [
      {
        path: DashobardPaths.OVERVIEW,
        loadComponent: () => import('#pages/dashboard/features/overview/overview.component'),
      },
      {
        path: DashobardPaths.CASH_FLOW,
        loadChildren: () => import('#pages/dashboard/features/cash-flow/cash-flow.module'),
      },
      {
        path: DashobardPaths.SETTINGS,
        loadChildren: () => import('#pages/dashboard/features/settings/settings.module'),
      },
      {
        path: DashobardPaths.TASKER,
        loadChildren: () => import('#pages/dashboard/features/tasker/tasker.module'),
      },
    ],
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class DashboardRoutingModule {}
