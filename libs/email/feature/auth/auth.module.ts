import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmailPath } from '@ngpk/email/enum';
import { AuthService } from '@ngpk/email/service';
import { UniqueUsername, MatchPassword } from '@ngpk/email/validator';

const routes: Routes = [
  {
    path: '',
    redirectTo: EmailPath.SIGNIN,
    pathMatch: 'full',
  },
  {
    path: EmailPath.SIGNIN,
    loadComponent: async () => (await import('@ngpk/email/component/auth')).SigninComponent,
  },
  {
    path: EmailPath.SIGNUP,
    loadComponent: async () => (await import('@ngpk/email/component/auth')).SignupComponent,
  },
  {
    path: EmailPath.SIGNOUT,
    loadComponent: async () => (await import('@ngpk/email/component/auth')).SignoutComponent,
  },
];

const imports = [RouterModule.forChild(routes)];
const providers = [AuthService, UniqueUsername, MatchPassword];

@NgModule({ imports, providers })
export class AuthModule {}
