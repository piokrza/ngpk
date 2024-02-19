import { Component, inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { PrimeNGConfig } from 'primeng/api';

import { ThemeService } from '#core/services';

@Component({
  selector: 'org-root',
  template: `
    <org-panel>
      <router-outlet />
    </org-panel>
  `,
})
export class AppComponent implements OnInit {
  private readonly themeService = inject(ThemeService);
  private readonly primengConfig = inject(PrimeNGConfig);
  private readonly translateService = inject(TranslateService);

  ngOnInit(): void {
    this.setPrimeNgConfig();
    this.themeService.applyTheme$().subscribe();
  }

  private setPrimeNgConfig(): void {
    this.primengConfig.ripple = true;
    this.translateService.get('primeng').subscribe((res) => this.primengConfig.setTranslation(res));
  }
}
