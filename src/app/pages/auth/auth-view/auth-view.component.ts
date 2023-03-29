import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ctrl-auth-view',
  template: `
    <div class="h-screen flex justify-center items-center">
      <section class="w-full h-full max-w-[25rem]">
        <router-outlet></router-outlet>
      </section>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthViewComponent {}
