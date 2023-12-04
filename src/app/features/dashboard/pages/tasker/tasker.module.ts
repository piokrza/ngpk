import { CommonModule, DatePipe } from '@angular/common';
import { NgModule, Provider } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DataViewModule } from 'primeng/dataview';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TabViewModule } from 'primeng/tabview';

import { TimestampPipe } from '#shared/pipes';
import { TaskerComponent } from '#tasker/.';
import { TaskFormComponent, TaskComponent, NoteFormComponent, NoteComponent } from '#tasker/components';
import { TaskerFacade } from '#tasker/data-access';

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
  SelectButtonModule,
  CheckboxModule,
  InputTextareaModule,
  DividerModule,
  TimestampPipe,
];
const declarations = [TaskComponent, TaskFormComponent, TaskerComponent, NoteFormComponent, NoteComponent];
const providers: Provider[] = [TaskerFacade, DatePipe];

@NgModule({ declarations, imports, providers })
export default class TaskerModule {}
