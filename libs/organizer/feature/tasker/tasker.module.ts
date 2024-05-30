import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmDialog } from 'primeng/confirmdialog';

import { OrganizerPathFragment } from '@ngpk/organizer/enum';
import { BoardsFacadeService } from '@ngpk/organizer/service';

const routes: Routes = [
  {
    path: '',
    loadComponent: async () => (await import('@ngpk/organizer/component/tasker')).BoardListComponent,
  },
  {
    path: OrganizerPathFragment.ID,
    loadComponent: async () => (await import('@ngpk/organizer/component/tasker')).BoardComponent,
  },
];

const imports = [RouterModule.forChild(routes)];
const providers = [BoardsFacadeService, ConfirmDialog];

@NgModule({ imports, providers })
export class TaskerModule {}
