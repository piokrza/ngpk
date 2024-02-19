import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppPaths } from '#core/enums';
import { featureFlagGuard } from '#core/guards';
import { getTitle } from '#core/utils';
import { DashboardComponent } from '#dashboard/index';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: AppPaths.DRIVE,
        canMatch: [featureFlagGuard('drive')],
        loadChildren: async () => (await import('#drive/index')).DriveModule,
        title: getTitle('drive'),
      },
      {
        path: AppPaths.CASH_FLOW,
        canMatch: [featureFlagGuard('cashFlow')],
        loadChildren: async () => (await import('#cash-flow/index')).CashFlowModule,
        title: getTitle('cashFlow'),
      },
      {
        path: AppPaths.SETTINGS,
        canMatch: [featureFlagGuard('settings')],
        loadChildren: async () => (await import('#settings/index')).SettingsModule,
        title: getTitle('settings'),
      },
      {
        path: AppPaths.TASKER,
        canMatch: [featureFlagGuard('tasker')],
        loadChildren: async () => (await import('#tasker/index')).TaskerModule,
        title: getTitle('tasker'),
      },
    ],
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class DashboardRoutingModule {}
