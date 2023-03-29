import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@features/ui/ui.module';
import { AccountSettingsComponent } from '@settings/components/account-settings/account-settings.component';
import { AccountSettingsFormComponent } from '@settings/components/account-settings-form/account-settings-form.component';
import { ThemeTogglerComponent } from '@settings/components/theme-toggler/theme-toggler.component';
import { SettingsRoutingModule } from '@settings/settings-routing.module';
import { SettingsViewComponent } from '@settings/settings-view/settings-view.component';
import { ContainerComponent } from '@standalone/components/container/container.component';

// PrimeNg
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';

const declarations: Array<any> = [
  SettingsViewComponent,
  ThemeTogglerComponent,
  AccountSettingsComponent,
  AccountSettingsFormComponent,
];
const imports: Array<any> = [
  CommonModule,
  SettingsRoutingModule,
  ToggleButtonModule,
  FormsModule,
  ContainerComponent,
  UiModule,
  DynamicDialogModule,
  ButtonModule,
  ReactiveFormsModule,
  InputTextModule,
  InputNumberModule,
];

@NgModule({ declarations, imports })
export class SettingsModule {}
