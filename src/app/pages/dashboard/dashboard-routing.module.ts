import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { getTitle } from '#common/utils';
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
        title: getTitle('home'),
      },
      {
        path: DashobardPaths.CASH_FLOW,
        loadChildren: () => import('#cash-flow/cash-flow.module'),
        title: getTitle('cashFlow'),
      },
      {
        path: DashobardPaths.SETTINGS,
        loadChildren: () => import('#settings/settings.module'),
        title: getTitle('settings'),
      },
      {
        path: DashobardPaths.TASKER,
        loadChildren: () => import('#tasker/tasker.module'),
        title: getTitle('tasker'),
      },
      {
        path: DashobardPaths.WEB3,
        loadChildren: () => import('#web3/web3.module'),
        title: getTitle('web3'),
      },
    ],
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class DashboardRoutingModule {}
