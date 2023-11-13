import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ctrl-auth-view',
  template: `
    <section class="section">
      <div class="w-full section__inner">
        <router-outlet></router-outlet>
      </div>
    </section>
  `,
  styleUrl: './auth-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthViewComponent {}
