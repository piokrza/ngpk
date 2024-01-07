import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountSettingsFormComponent, PanelComponent } from '#settings/components';

const routes: Routes = [
  {
    path: '',
    component: PanelComponent,
  },
  {
    path: 'edit-profile',
    component: AccountSettingsFormComponent,
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class SettingsRoutingModule {}
