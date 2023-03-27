import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiModule } from '@features/ui/ui.module';
import { SettingsRoutingModule } from '@settings/settings-routing.module';
import { SettingsViewComponent } from '@settings/settings-view/settings-view.component';
import { ContainerComponent } from '@standalone/components/container/container.component';

// PrimeNg
import { ToggleButtonModule } from 'primeng/togglebutton';

const declarations: Array<any> = [SettingsViewComponent];
const imports: Array<any> = [
  CommonModule,
  SettingsRoutingModule,
  ToggleButtonModule,
  FormsModule,
  ContainerComponent,
  UiModule,
];

@NgModule({ declarations, imports })
export class SettingsModule {}
