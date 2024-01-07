import { Component, inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'org-root',
  template: `<router-outlet />`,
})
export class AppComponent implements OnInit {
  readonly #primengConfig = inject(PrimeNGConfig);
  readonly #translateService = inject(TranslateService);

  public ngOnInit(): void {
    this.setPrimeNgConfig();
  }

  private setPrimeNgConfig(): void {
    this.#primengConfig.ripple = true;
    this.#translateService.get('primeng').subscribe((res) => this.#primengConfig.setTranslation(res));
  }
}
