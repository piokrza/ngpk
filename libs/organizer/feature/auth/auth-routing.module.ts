import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthPaths } from '@ngpk/organizer/enum';
import { AuthComponent } from '@ngpk/organizer/feature/auth';
import { LoginFormComponent, RegisterFormComponent } from '@ngpk/organizer/shared';

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
