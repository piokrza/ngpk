import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { getTitle } from '#common/utils';
import { DashboardComponent } from '#dashboard/.';
import { DashobardPaths } from '#dashboard/enums';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: DashobardPaths.OVERVIEW,
        pathMatch: 'full',
      },
      {
        path: DashobardPaths.OVERVIEW,
        loadComponent: () => import('#overview/overview.component'),
        title: getTitle('home'),
      },
      {
        path: DashobardPaths.DRIVE,
        loadChildren: () => import('#drive/drive.module'),
        title: getTitle('drive'),
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
    ],
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class DashboardRoutingModule {}
