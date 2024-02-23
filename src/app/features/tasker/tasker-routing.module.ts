import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PathFragment } from '#core/enums';
import { BoardListComponent } from '#tasker/components';

const routes: Routes = [
  {
    path: '',
    component: BoardListComponent,
  },
  {
    path: PathFragment.ID,
    loadComponent: async () => (await import('#tasker/components')).BoardComponent,
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class TaskerRoutingModule {}
