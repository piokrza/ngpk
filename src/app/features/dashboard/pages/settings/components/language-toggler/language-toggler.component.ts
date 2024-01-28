import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { PrimeNGConfig } from 'primeng/api';
import { SelectButtonChangeEvent, SelectButtonModule } from 'primeng/selectbutton';

import { lang } from '#core/utils';

const imports = [SelectButtonModule, FormsModule, TranslateModule];

@Component({
  selector: 'org-language-toggler',
  templateUrl: './language-toggler.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class LanguageTogglerComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly translateService = inject(TranslateService);
  private readonly config: PrimeNGConfig = inject(PrimeNGConfig);

  languageValue = localStorage.getItem(lang) ?? 'pl';

  onLangChange({ value }: SelectButtonChangeEvent): void {
    localStorage.setItem(lang, value ?? 'pl');
    this.translateService.use(value ?? 'pl');
    this.translateService
      .get('primeng')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => this.config.setTranslation(res));
  }
}
