import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { featureFlagGuard } from '#core/guards';
import { getTitle } from '#core/utils';
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
        canMatch: [featureFlagGuard('overview')],
        loadComponent: async () => (await import('#overview/overview.component')).OverviewComponent,
        title: getTitle('home'),
      },
      {
        path: DashobardPaths.DRIVE,
        canMatch: [featureFlagGuard('drive')],
        loadChildren: async () => (await import('#drive/drive.module')).DriveModule,
        title: getTitle('drive'),
      },
      {
        path: DashobardPaths.CASH_FLOW,
        canMatch: [featureFlagGuard('cashFlow')],
        loadChildren: async () => (await import('#cash-flow/cash-flow.module')).CashFlowModule,
        title: getTitle('cashFlow'),
      },
      {
        path: DashobardPaths.SETTINGS,
        canMatch: [featureFlagGuard('settings')],
        loadChildren: async () => (await import('#settings/settings.module')).SettingsModule,
        title: getTitle('settings'),
      },
      {
        path: DashobardPaths.TASKER,
        canMatch: [featureFlagGuard('tasker')],
        loadChildren: async () => (await import('#tasker/tasker.module')).TaskerModule,
        title: getTitle('tasker'),
      },
    ],
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class DashboardRoutingModule {}
