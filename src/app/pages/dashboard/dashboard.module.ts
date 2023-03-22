import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from '@dashboard/dashboard-routing.module';
import { DashboardViewComponent } from '@dashboard/dashboard-view/dashboard-view.component';

// PrimeNg
import { ChartModule } from 'primeng/chart';

const declarations: Array<any> = [DashboardViewComponent];
const imports: Array<any> = [CommonModule, DashboardRoutingModule, ChartModule];

@NgModule({ declarations, imports })
export class DashboardModule {}
