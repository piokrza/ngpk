import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrganizerPathFragment } from '@ngpk/core/enum';
import { DriveComponent } from '@ngpk/drive/shared';

const routes: Routes = [
  {
    path: '',
    component: DriveComponent,
  },
  {
    path: OrganizerPathFragment.ID,
    component: DriveComponent,
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class DriveRoutingModule {}
