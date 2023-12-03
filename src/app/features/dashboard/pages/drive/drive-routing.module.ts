import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DriveComponent } from '#drive/.';
import { DrivePaths } from '#drive/enums';
import { AddFileComponent } from '#drive/features';

const routes: Routes = [
  {
    path: '',
    component: DriveComponent,
    children: [
      {
        path: '',
        redirectTo: DrivePaths.ADD_FILE,
        pathMatch: 'full',
      },
      {
        path: DrivePaths.ADD_FILE,
        component: AddFileComponent,
      },
    ],
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class DriveRoutingModule {}
