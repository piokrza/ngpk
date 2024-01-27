import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DriveComponent } from '#drive/index';

const routes: Routes = [
  {
    path: '',
    component: DriveComponent,
  },
  {
    path: `:id`,
    component: DriveComponent,
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class DriveRoutingModule {}
