import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IncomesViewComponent } from '#pages/incomes';

const routes: Routes = [{ path: '', component: IncomesViewComponent }];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class IncomesRoutingModule {}
