import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';

const imports = [RouterModule, MatTabsModule];

@Component({
  selector: 'app-root',
  template: `
    <mat-tab-group mat-stretch-tabs="false" mat-align-tabs="center">
      <mat-tab label="Projects">Projects</mat-tab>
      <mat-tab label="Contact">Contact</mat-tab>
    </mat-tab-group>
  `,
  styleUrl: './app.component.scss',
  standalone: true,
  imports,
})
export class AppComponent {}
