import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignoutComponent } from '@shared/components';
import { AuthGuard } from '@shared/guards';
import { SigninComponent, SignupComponent } from '@auth/components';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full',
  },
  {
    path: 'signin',
    canActivate: [AuthGuard],
    component: SigninComponent,
  },
  {
    path: 'signup',
    canActivate: [AuthGuard],
    component: SignupComponent,
  },
  {
    path: 'signout',
    component: SignoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
