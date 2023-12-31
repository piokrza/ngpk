import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'org-auth',
  template: `
    <section class="section">
      <div class="w-full section__inner">
        <router-outlet />
      </div>
    </section>
  `,
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {}
