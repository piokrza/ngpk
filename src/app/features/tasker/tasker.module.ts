import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DataViewModule } from 'primeng/dataview';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';

import { TaskFormComponent, NoteComponent, PanelComponent, TaskComponent, TaskSectionComponent } from '#features/tasker/components';

const imports = [
  CommonModule,
  TranslateModule,
  CardModule,
  DataViewModule,
  TabViewModule,
  ButtonModule,
  ReactiveFormsModule,
  InputTextModule,
  CheckboxModule,
];
const declarations = [PanelComponent, TaskComponent, NoteComponent, TaskSectionComponent, TaskFormComponent];

@NgModule({ declarations, imports, exports: [PanelComponent] })
export class TaskerModule {}
