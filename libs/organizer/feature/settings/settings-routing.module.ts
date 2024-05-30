import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PanelComponent } from '@ngpk/organizer/component/settings';
import { OrganizerPathFragment } from '@ngpk/organizer/enum';

const routes: Routes = [
  {
    path: '',
    component: PanelComponent,
  },
  {
    path: OrganizerPathFragment.EDIT_PROFILE,
    loadComponent: async () => (await import('@ngpk/organizer/component/settings')).AccountSettingsFormComponent,
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class SettingsRoutingModule {}
