import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CashFlowComponent } from '#cash-flow/index';
import { PathFragment } from '#core/enums';

const routes: Routes = [
  {
    path: '',
    component: CashFlowComponent,
  },
  {
    path: `${PathFragment.DETAILS}/${PathFragment.ID}`,
    loadComponent: async () => (await import('#cash-flow/cash-flow-details/cash-flow-details.component')).CashFlowDetailsComponent,
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class CashFlowRoutingModule {}
