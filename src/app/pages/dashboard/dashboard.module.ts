import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from '@dashboard/dashboard-routing.module';
import { DashboardViewComponent } from '@dashboard/dashboard-view/dashboard-view.component';
import { UiModule } from '@features/ui/ui.module';

// PrimeNg
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';

const declarations: Array<any> = [DashboardViewComponent];
const imports: Array<any> = [CommonModule, DashboardRoutingModule, ChartModule, UiModule, CardModule];

@NgModule({ declarations, imports })
export class DashboardModule {}
