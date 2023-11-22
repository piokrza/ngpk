import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingsViewComponent } from '#settings/.';

const routes: Routes = [{ path: '', component: SettingsViewComponent }];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class SettingsRoutingModule {}
