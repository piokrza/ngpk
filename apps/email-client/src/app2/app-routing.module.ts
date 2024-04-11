import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from '@auth/.';
import { InboxModule } from '@inbox/.';
import { AuthGuard } from '@shared/guards';

const routes: Routes = [
  {
    path: '',
    loadChildren: (): Promise<any> =>
      import('@auth/auth.module').then(({ AuthModule }): AuthModule => AuthModule),
  },
  {
    canLoad: [AuthGuard],
    path: 'inbox',
    loadChildren: (): Promise<any> =>
      import('@inbox/inbox.module').then(({ InboxModule }): InboxModule => InboxModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
