import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { TabViewModule } from 'primeng/tabview';

import { AddTaskFormComponent, PanelComponent, TaskComponent } from '#features/tasker/components';

const imports = [CommonModule, TranslateModule, CardModule, DataViewModule, TabViewModule, ButtonModule];
const declarations = [PanelComponent, TaskComponent, AddTaskFormComponent];

@NgModule({ declarations, imports, exports: [PanelComponent] })
export class TaskerModule {}
