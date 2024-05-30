import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrganizerPathFragment } from '@ngpk/organizer/enum';
import { CashFlowFacadeService, CashFlowFilterService, CashFlowPaginationService, OverviewService } from '@ngpk/organizer/service';

const routes: Routes = [
  {
    path: '',
    loadComponent: async () => (await import('@ngpk/organizer/component/cash-flow')).CashFlowViewComponent,
  },
  {
    path: `${OrganizerPathFragment.DETAILS}/${OrganizerPathFragment.ID}`,
    loadComponent: async () => (await import('@ngpk/organizer/component/cash-flow')).DetailsComponent,
  },
];

const imports = [RouterModule.forChild(routes)];
const providers = [CashFlowFacadeService, CashFlowPaginationService, CashFlowFilterService, OverviewService];

@NgModule({ imports, providers })
export class CashFlowModule {}
