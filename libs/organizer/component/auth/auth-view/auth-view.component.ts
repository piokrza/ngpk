import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

const imports = [RouterOutlet];

@Component({
  selector: 'ngpk-auth',
  template: `
    <section class="section">
      <div class="w-full section__inner">
        <router-outlet />
      </div>
    </section>
  `,
  styleUrl: './auth-view.component.scss',
  standalone: true,
  imports,
})
export class AuthViewComponent {}
