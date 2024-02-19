import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardPathFragments } from '#dashboard/enums';
import { AccountSettingsFormComponent, PanelComponent } from '#settings/components';

const routes: Routes = [
  {
    path: '',
    component: PanelComponent,
  },
  {
    path: DashboardPathFragments.EDIT_PROFILE,
    component: AccountSettingsFormComponent,
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class SettingsRoutingModule {}
