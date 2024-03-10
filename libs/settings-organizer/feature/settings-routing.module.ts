import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PathFragment } from '@ngpk/core/enum';
import { AccountSettingsFormComponent, PanelComponent } from '@ngpk/settings-organizer/shared';

const routes: Routes = [
  {
    path: '',
    component: PanelComponent,
  },
  {
    path: PathFragment.EDIT_PROFILE,
    component: AccountSettingsFormComponent,
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class SettingsRoutingModule {}
