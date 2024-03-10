import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PathFragment } from '@ngpk/core/enum';
import { DriveComponent } from '#drive/components';

const routes: Routes = [
  {
    path: '',
    component: DriveComponent,
  },
  {
    path: `${PathFragment.ID}`,
    component: DriveComponent,
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class DriveRoutingModule {}
