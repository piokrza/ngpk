import { NgModule } from '@angular/core';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';

import { TaskerRoutingModule } from '@ngpk/organizer/feature/tasker';
import { BoardsFacadeService } from '@ngpk/organizer/service';

const imports = [TaskerRoutingModule, ConfirmDialogModule];
const providers = [BoardsFacadeService, ConfirmDialog];

@NgModule({ imports, providers })
export class TaskerModule {}
