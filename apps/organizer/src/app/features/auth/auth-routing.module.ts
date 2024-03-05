import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginFormComponent, RegisterFormComponent } from '#auth/components';
import { AuthPaths } from '#auth/enums';
import { AuthComponent } from '#auth/index';

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
