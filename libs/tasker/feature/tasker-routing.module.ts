import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PathFragment } from '@ngpk/core/enum';

const routes: Routes = [
  {
    path: '',
    loadComponent: async () => (await import('@ngpk/tasker/shared')).BoardListComponent,
  },
  {
    path: PathFragment.ID,
    loadComponent: async () => (await import('@ngpk/tasker/shared')).BoardComponent,
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class TaskerRoutingModule {}
