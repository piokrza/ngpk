import { Component, inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'ctrl-root',
  template: `<router-outlet />`,
})
export class AppComponent implements OnInit {
  private readonly primengConfig: PrimeNGConfig = inject(PrimeNGConfig);
  private readonly translateService: TranslateService = inject(TranslateService);

  public ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.translateService.get('primeng').subscribe((res) => this.primengConfig.setTranslation(res));
  }
}
