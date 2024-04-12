import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { emailResolver } from '@ngpk/email/resolver';
import { EmailShowComponent, HomeComponent, PlaceholderComponent, NotFoundPageComponent } from '@ngpk/email/shared/components';

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
