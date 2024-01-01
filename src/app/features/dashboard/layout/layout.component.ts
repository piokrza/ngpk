import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'org-layout',
  template: `
    <div class="wrapper">
      <org-navigation />

      <!-- TODO: add max width  -->
      <main>
        <org-container>
          <ng-content />
        </org-container>
      </main>
    </div>

    <p-toast position="top-right" />
    <p-confirmDialog />
  `,
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {}
