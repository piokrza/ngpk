import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrganizerPathFragment } from '@ngpk/organizer/enum';

const routes: Routes = [
  {
    path: '',
    loadComponent: async () => (await import('@ngpk/organizer/shared')).BoardListComponent,
  },
  {
    path: OrganizerPathFragment.ID,
    loadComponent: async () => (await import('@ngpk/organizer/shared')).BoardComponent,
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class TaskerRoutingModule {}
