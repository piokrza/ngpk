import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { PrimeNGConfig } from 'primeng/api';
import { SelectButtonChangeEvent, SelectButtonModule } from 'primeng/selectbutton';

import { LANG } from '#core/utils';

const imports = [SelectButtonModule, FormsModule, TranslateModule];

@UntilDestroy()
@Component({
  selector: 'org-language-toggler',
  templateUrl: './language-toggler.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class LanguageTogglerComponent {
  private readonly translateService = inject(TranslateService);
  private readonly config: PrimeNGConfig = inject(PrimeNGConfig);

  languageValue = localStorage.getItem(LANG) ?? 'pl';

  public onLangChange({ value }: SelectButtonChangeEvent): void {
    localStorage.setItem(LANG, value ?? 'pl');
    this.translateService.use(value ?? 'pl');
    this.translateService
      .get('primeng')
      .pipe(untilDestroyed(this))
      .subscribe((res) => this.config.setTranslation(res));
  }
}
