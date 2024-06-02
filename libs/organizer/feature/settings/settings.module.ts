import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PathFragment } from '@ngpk/organizer/enum';

const routes: Routes = [
  {
    path: '',
    loadComponent: async () => (await import('@ngpk/organizer/component/settings')).PanelComponent,
  },
  {
    path: PathFragment.EDIT_PROFILE,
    loadComponent: async () => (await import('@ngpk/organizer/component/settings')).AccountSettingsFormComponent,
  },
];

const imports = [RouterModule.forChild(routes)];

@NgModule({ imports })
export class SettingsModule {}
