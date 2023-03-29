import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ctrl-auth-view',
  template: `
    <section class="h-screen flex justify-center items-center">
      <div class="w-full max-w-[25rem]">
        <router-outlet></router-outlet>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthViewComponent {}
