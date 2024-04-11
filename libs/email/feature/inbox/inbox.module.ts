import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';

import { InboxApi } from '@ngpk/email/api';
import { InboxRoutingModule } from '@ngpk/email/feature/inbox';
import { EmailService } from '@ngpk/email/service';
import {
  HomeComponent,
  EmailCreateComponent,
  EmailIndexComponent,
  EmailReplyComponent,
  EmailShowComponent,
  PlaceholderComponent,
} from '@ngpk/email/shared/components';
import { InboxStateService } from '@ngpk/email/state/inbox';

const imports = [
  CommonModule,
  InboxRoutingModule,
  ReactiveFormsModule,
  HomeComponent,
  EmailCreateComponent,
  EmailIndexComponent,
  EmailReplyComponent,
  EmailShowComponent,
  PlaceholderComponent,
];
const providers = [EmailService, InboxApi, InboxStateService, DialogService, InboxApi];

@NgModule({ imports, providers })
export class InboxModule {}
