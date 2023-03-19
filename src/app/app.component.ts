import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="flex">
      <cctrl-navigation></cctrl-navigation>
    </div>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
