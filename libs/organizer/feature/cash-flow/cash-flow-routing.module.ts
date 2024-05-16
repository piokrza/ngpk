import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganizerPathFragment } from '@ngpk/core/enum';
import { CashFlowComponent } from '@ngpk/organizer/feature/cash-flow';

const routes: Routes = [
  {
    path: '',
    component: CashFlowComponent,
  },
  {
    path: `${OrganizerPathFragment.DETAILS}/${OrganizerPathFragment.ID}`,
    loadComponent: async () => (await import('@ngpk/organizer/shared')).CashFlowDetailsComponent,
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class CashFlowRoutingModule {}
