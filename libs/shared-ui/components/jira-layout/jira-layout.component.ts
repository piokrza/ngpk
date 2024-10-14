import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';

const imports = [MatSidenavModule];

@Component({
  selector: 'ngpk-jira-layout',
  template: `
    <mat-drawer-container autosize class="w-4">
      <mat-drawer #drawer mode="side">
        <p>Auto-resizing sidenav</p>
        @if (showFiller) {
          <p>Lorem, ipsum dolor sit amet consectetur.</p>
        }
        <button (click)="showFiller = !showFiller" mat-raised-button>Toggle extra text</button>
      </mat-drawer>

      <div>
        <button type="button" mat-button (click)="drawer.toggle()">Toggle sidenav</button>
      </div>
      <ng-content />
    </mat-drawer-container>
  `,
  styleUrl: './jira-layout.component.scss',
  standalone: true,
  imports,
})
export class JiraLayoutComponent {
  showFiller = false;
}
