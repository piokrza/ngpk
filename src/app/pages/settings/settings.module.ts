import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from '@settings/settings-routing.module';
import { SettingsViewComponent } from '@settings/settings-view/settings-view.component';

const declarations: Array<any> = [SettingsViewComponent];
const imports: Array<any> = [CommonModule, SettingsRoutingModule];

@NgModule({ declarations, imports })
export class SettingsModule {}
