import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent, EmailShowComponent, PlaceholderComponent } from '@ngpk/email/component/inbox';
import { NotFoundPageComponent } from '@ngpk/email/component/shared';
import { emailResolver } from '@ngpk/email/resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'not-found',
        component: NotFoundPageComponent,
      },
      {
        path: ':id',
        component: EmailShowComponent,
        resolve: { email: emailResolver },
      },
      {
        path: '',
        component: PlaceholderComponent,
      },
    ],
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class InboxRoutingModule {}
