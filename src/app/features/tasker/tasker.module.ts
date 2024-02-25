import { NgModule } from '@angular/core';

import { TaskerRoutingModule } from '#tasker/index';
import { BoardsFacadeService } from '#tasker/services';

const imports = [TaskerRoutingModule];
const providers = [BoardsFacadeService];

@NgModule({ imports, providers })
export class TaskerModule {}
