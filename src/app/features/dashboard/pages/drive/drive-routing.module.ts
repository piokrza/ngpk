import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DriveComponent } from '#drive/.';
import { FileListComponent } from '#drive/features';

const routes: Routes = [
  {
    path: '',
    component: DriveComponent,
    children: [
      {
        path: '',
        component: FileListComponent,
      },
    ],
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class DriveRoutingModule {}
