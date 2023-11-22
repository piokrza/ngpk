import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '#dashboard/.';
import { DashobardPaths } from '#dashboard/enums';
import { DashboardRedirectGuard } from '#dashboard/guards';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [DashboardRedirectGuard],
    children: [
      {
        path: DashobardPaths.OVERVIEW,
        loadComponent: () => import('#overview/overview.component'),
      },
      {
        path: DashobardPaths.CASH_FLOW,
        loadChildren: () => import('#cash-flow/cash-flow.module'),
      },
      {
        path: DashobardPaths.SETTINGS,
        loadChildren: () => import('#settings/settings.module'),
      },
      {
        path: DashobardPaths.TASKER,
        loadChildren: () => import('#tasker/tasker.module'),
      },
      {
        path: DashobardPaths.WEB3,
        loadChildren: () => import('#web3/web3.module'),
      },
    ],
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class DashboardRoutingModule {}
