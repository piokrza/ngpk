import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashobardPaths } from '#core/enums';
import { featureFlagGuard } from '#core/guards';
import { getTitle } from '#core/utils';
import { DashboardComponent } from '#dashboard/.';

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
        canMatch: [featureFlagGuard('overview')],
        loadComponent: () => import('#overview/overview.component'),
        title: getTitle('home'),
      },
      {
        path: DashobardPaths.DRIVE,
        canMatch: [featureFlagGuard('drive')],
        loadChildren: () => import('#drive/drive.module'),
        title: getTitle('drive'),
      },
      {
        path: DashobardPaths.CASH_FLOW,
        canMatch: [featureFlagGuard('cashFlow')],
        loadChildren: () => import('#cash-flow/cash-flow.module'),
        title: getTitle('cashFlow'),
      },
      {
        path: DashobardPaths.SETTINGS,
        canMatch: [featureFlagGuard('settings')],
        loadChildren: () => import('#settings/settings.module'),
        title: getTitle('settings'),
      },
      {
        path: DashobardPaths.TASKER,
        canMatch: [featureFlagGuard('tasker')],
        loadChildren: () => import('#tasker/tasker.module'),
        title: getTitle('tasker'),
      },
    ],
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class DashboardRoutingModule {}
