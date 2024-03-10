import { NgModule } from '@angular/core';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';

import { TaskerRoutingModule } from '@ngpk/tasker/feature';
import { BoardsFacadeService } from '@ngpk/tasker/service';

const imports = [TaskerRoutingModule, ConfirmDialogModule];
const providers = [BoardsFacadeService, ConfirmDialog];

@NgModule({ imports, providers })
export class TaskerModule {}
