import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { featureFlagGuard } from '#core/guards';
import { getTitle } from '#core/utils';
import { DashobardPaths } from '#dashboard/enums';
import { DashboardComponent } from '#dashboard/index';

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
        loadComponent: async () => (await import('#overview/index')).OverviewComponent,
        title: getTitle('home'),
      },
      {
        path: DashobardPaths.DRIVE,
        canMatch: [featureFlagGuard('drive')],
        loadChildren: async () => (await import('#drive/index')).DriveModule,
        title: getTitle('drive'),
      },
      {
        path: DashobardPaths.CASH_FLOW,
        canMatch: [featureFlagGuard('cashFlow')],
        loadChildren: async () => (await import('#cash-flow/index')).CashFlowModule,
        title: getTitle('cashFlow'),
      },
      {
        path: DashobardPaths.SETTINGS,
        canMatch: [featureFlagGuard('settings')],
        loadChildren: async () => (await import('#settings/index')).SettingsModule,
        title: getTitle('settings'),
      },
      {
        path: DashobardPaths.TASKER,
        canMatch: [featureFlagGuard('tasker')],
        loadChildren: async () => (await import('#tasker/index')).TaskerModule,
        title: getTitle('tasker'),
      },
    ],
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class DashboardRoutingModule {}
