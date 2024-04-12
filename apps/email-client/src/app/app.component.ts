import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <ngpk-layout>
      <router-outlet />
    </ngpk-layout>
  `,
})
export class AppComponent {}
