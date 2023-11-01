import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PanelComponent } from '#features/tasker/components';

const imports = [CommonModule];
const declarations = [PanelComponent];
const exports = [PanelComponent];

@NgModule({ declarations, imports, exports })
export class TaskerModule {}
