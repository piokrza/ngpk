import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  {
    path: '',
    loadComponent: async () => (await import('@ngpk/playground/component/crud')).HomeComponent,
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)] })
export class CrudModule {}
