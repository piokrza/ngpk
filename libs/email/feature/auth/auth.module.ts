import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthService } from '@ngpk/email/service';
import { UniqueUsername, MatchPassword } from '@ngpk/email/validator';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full',
  },
  {
    path: 'signin', // TODO: add path
    loadComponent: async () => (await import('@ngpk/email/component/auth')).SigninComponent,
  },
  {
    path: 'signup',
    loadComponent: async () => (await import('@ngpk/email/component/auth')).SignupComponent,
  },
  {
    path: 'signout',
    loadComponent: async () => (await import('@ngpk/email/component/auth')).SignoutComponent,
  },
];

const imports = [RouterModule.forChild(routes)];
const providers = [AuthService, UniqueUsername, MatchPassword];

@NgModule({ imports, providers })
export class AuthModule {}
