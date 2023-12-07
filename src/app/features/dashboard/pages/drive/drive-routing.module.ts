import { FolderDetailsComponent } from './components/folder-details';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FileListComponent } from '#dashboard/pages/drive/components/file-list';
import { DriveComponent } from '#drive/.';
import { DrivePaths } from '#drive/enums';

const routes: Routes = [
  {
    path: '',
    component: DriveComponent,
    children: [
      {
        path: '',
        component: FileListComponent,
      },
      {
        path: DrivePaths.DETAILS + '/:id',
        component: FolderDetailsComponent,
      },
    ],
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class DriveRoutingModule {}
