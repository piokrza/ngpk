import { Component, inject, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'ctrl-root',
  template: `
    <ctrl-navigation></ctrl-navigation>

    <main class="min-h-screen xl:pl-[22.5rem] px-3 xl:p-5">
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent implements OnInit {
  private primengConfig: PrimeNGConfig = inject(PrimeNGConfig);

  public ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
}
