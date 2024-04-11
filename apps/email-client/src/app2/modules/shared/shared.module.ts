import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenubarModule } from 'primeng/menubar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';

import { FormsModule } from '@angular/forms';
import {
  FormContainerComponent,
  FormInputComponent,
  HeaderComponent,
  NotFoundPageComponent,
  SignoutComponent,
} from '@shared/components';

const PRIMENG_MODULES = [
  ButtonModule,
  ProgressSpinnerModule,
  InputTextModule,
  ReactiveFormsModule,
  MenubarModule,
  ToastModule,
  TableModule,
  DynamicDialogModule,
  InputTextareaModule,
  ToggleButtonModule,
];
const declarations = [
  FormInputComponent,
  HeaderComponent,
  SignoutComponent,
  NotFoundPageComponent,
  FormContainerComponent,
];
const imports = [CommonModule, ...PRIMENG_MODULES, FormsModule];
const exports = [
  ...PRIMENG_MODULES,
  FormInputComponent,
  HeaderComponent,
  SignoutComponent,
  NotFoundPageComponent,
  FormContainerComponent,
];

@NgModule({
  declarations,
  imports,
  exports,
})
export class SharedModule {}
