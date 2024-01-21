import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DataViewModule } from 'primeng/dataview';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TabViewModule } from 'primeng/tabview';
import { ToggleButtonModule } from 'primeng/togglebutton';

import { ContainerComponent } from '#shared/components';
import { TimestampPipe } from '#shared/pipes';
import { TaskerComponent } from '#tasker/.';
import { TaskFormComponent, TaskComponent, NoteFormComponent, NoteComponent } from '#tasker/components';
import { TaskerFacadeService } from '#tasker/services';

const routes: Routes = [{ path: '', component: TaskerComponent }];

const imports = [
  RouterModule.forChild(routes),
  CommonModule,
  TranslateModule,
  CardModule,
  DataViewModule,
  TabViewModule,
  ButtonModule,
  ReactiveFormsModule,
  InputTextModule,
  ProgressSpinnerModule,
  FormsModule,
  DropdownModule,
  CheckboxModule,
  InputTextareaModule,
  DividerModule,
  TimestampPipe,
  ToggleButtonModule,
  ContainerComponent,
];
const declarations = [TaskComponent, TaskFormComponent, TaskerComponent, NoteFormComponent, NoteComponent];
const providers = [TaskerFacadeService, DatePipe];

@NgModule({ declarations, imports, providers })
export class TaskerModule {}
