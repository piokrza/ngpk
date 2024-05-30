import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthApiService } from '@ngpk/organizer/api';
import { AuthPaths } from '@ngpk/organizer/enum';
import { AuthFormService } from '@ngpk/organizer/service';

const routes: Routes = [
  {
    path: '',
    loadComponent: async () => (await import('@ngpk/organizer/component/auth')).AuthViewComponent,
    children: [
      { path: '', redirectTo: AuthPaths.LOGIN, pathMatch: 'full' },
      { path: AuthPaths.LOGIN, loadComponent: async () => (await import('@ngpk/organizer/component/auth')).LoginFormComponent },
      { path: AuthPaths.REGISTER, loadComponent: async () => (await import('@ngpk/organizer/component/auth')).RegisterFormComponent },
    ],
  },
];

const imports = [RouterModule.forChild(routes)];
const providers = [AuthFormService, AuthApiService];

@NgModule({ imports, providers })
export class AuthModule {}
