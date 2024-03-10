import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthPaths } from '@ngpk/auth-organizer/enum';
import { AuthComponent } from '@ngpk/auth-organizer/feature';
import { LoginFormComponent, RegisterFormComponent } from '@ngpk/auth-organizer/shared';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: AuthPaths.LOGIN, pathMatch: 'full' },
      { path: AuthPaths.LOGIN, component: LoginFormComponent },
      { path: AuthPaths.REGISTER, component: RegisterFormComponent },
    ],
  },
];
@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class AuthRoutingModule {}
