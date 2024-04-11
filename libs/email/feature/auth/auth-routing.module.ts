import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from '@ngpk/email/guard';
import { SignoutComponent, SigninComponent, SignupComponent } from '@ngpk/email/shared/components';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full',
  },
  {
    path: 'signin',
    canMatch: [authGuard],
    component: SigninComponent, //add lazy loading
  },
  {
    path: 'signup',
    canMatch: [authGuard],
    component: SignupComponent,
  },
  {
    path: 'signout',
    component: SignoutComponent,
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class AuthRoutingModule {}
