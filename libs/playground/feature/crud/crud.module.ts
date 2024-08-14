import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: async () => (await import('@ngpk/playground/component/crud')).HomeComponent,
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)] })
export class CrudModule {}
