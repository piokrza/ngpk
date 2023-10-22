/* eslint-disable @typescript-eslint/no-explicit-any */
import { NgModule } from '@angular/core';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { RouterModule, Routes } from '@angular/router';

import { AuthModule } from '#pages/auth';
import { DashboardModule } from '#pages/dashboard';
import { ExpensesModule } from '#pages/expenses';
import { IncomesModule } from '#pages/incomes';
import { SettingsModule } from '#pages/settings';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: (): Promise<any> =>
      import('#pages/dashboard/dashboard.module').then((m): DashboardModule => m.DashboardModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: () => redirectUnauthorizedTo(['authentication']) },
  },
  {
    path: 'incomes',
    loadChildren: (): Promise<any> =>
      import('#pages/incomes/incomes.module').then((m): IncomesModule => m.IncomesModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: () => redirectUnauthorizedTo(['authentication']) },
  },
  {
    path: 'expenses',
    loadChildren: (): Promise<any> =>
      import('#pages/expenses/expenses.module').then((m): ExpensesModule => m.ExpensesModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: () => redirectUnauthorizedTo(['authentication']) },
  },
  {
    path: 'settings',
    loadChildren: (): Promise<any> =>
      import('#pages/settings/settings.module').then((m): SettingsModule => m.SettingsModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: () => redirectUnauthorizedTo(['authentication']) },
  },
  {
    path: 'authentication',
    loadChildren: (): Promise<any> => import('#pages/auth/auth.module').then((m): AuthModule => m.AuthModule),
  },
];

@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class AppRoutingModule {}
