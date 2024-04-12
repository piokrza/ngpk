import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from '@ngpk/email/guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full',
  },
  {
    path: 'signin',
    canMatch: [authGuard],
    loadComponent: async () => (await import('@ngpk/email/shared/components')).SigninComponent,
  },
  {
    path: 'signup',
    canMatch: [authGuard],
    loadComponent: async () => (await import('@ngpk/email/shared/components')).SignupComponent,
  },
  {
    path: 'signout',
    loadComponent: async () => (await import('@ngpk/email/shared/components')).SignoutComponent,
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class AuthRoutingModule {}
