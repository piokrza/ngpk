import { Component, inject, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'ctrl-root',
  template: `
    <div class="max-w-[130rem] mx-auto">
      <ctrl-navigation></ctrl-navigation>

      <main class="h-[calc(100vh-82px)] p-3 xl:pl-[22.5rem] xl:h-[100vh] xl:p-5">
        <ctrl-container>
          <router-outlet></router-outlet>
        </ctrl-container>
      </main>
    </div>
  `,
})
export class AppComponent implements OnInit {
  private primengConfig: PrimeNGConfig = inject(PrimeNGConfig);

  public ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
}
