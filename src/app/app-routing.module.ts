import { NgModule } from '@angular/core';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from '@auth/auth.module';
import { DashboardModule } from '@dashboard/dashboard.module';
import { ExpensesModule } from '@expenses/expenses.module';
import { IncomesModule } from '@incomes/incomes.module';
import { SettingsModule } from '@settings/settings.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: (): Promise<any> =>
      import('@dashboard/dashboard.module').then(({ DashboardModule }): DashboardModule => DashboardModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: () => redirectUnauthorizedTo(['authentication']) },
  },
  {
    path: 'incomes',
    loadChildren: (): Promise<any> =>
      import('@incomes/incomes.module').then(({ IncomesModule }): IncomesModule => IncomesModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: () => redirectUnauthorizedTo(['authentication']) },
  },
  {
    path: 'expenses',
    loadChildren: (): Promise<any> =>
      import('@expenses/expenses.module').then(({ ExpensesModule }): ExpensesModule => ExpensesModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: () => redirectUnauthorizedTo(['authentication']) },
  },
  {
    path: 'settings',
    loadChildren: (): Promise<any> =>
      import('@settings/settings.module').then(({ SettingsModule }): SettingsModule => SettingsModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: () => redirectUnauthorizedTo(['authentication']) },
  },
  {
    path: 'authentication',
    loadChildren: (): Promise<any> => import('@auth/auth.module').then(({ AuthModule }): AuthModule => AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
