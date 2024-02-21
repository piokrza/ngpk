import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskerComponent } from '#tasker/components';

const routes: Routes = [
  {
    path: '',
    component: TaskerComponent,
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class TaskerRoutingModule {}
