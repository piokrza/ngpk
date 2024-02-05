import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PathFragment } from '#core/enums';
import { DriveComponent } from '#drive/index';

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
