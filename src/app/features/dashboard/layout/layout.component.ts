import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ctrl-layout',
  template: `
    <div class="wrapper">
      <ctrl-navigation />

      <main>
        <ctrl-container>
          <ng-content />
        </ctrl-container>
      </main>
    </div>

    <p-toast position="top-right" />
    <p-confirmDialog />
  `,
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {}
