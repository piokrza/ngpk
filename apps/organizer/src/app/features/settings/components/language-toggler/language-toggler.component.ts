import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonChangeEvent } from 'primeng/selectbutton';

import { lang } from '@ngpk/core/util';

const imports = [FormsModule, TranslateModule, DropdownModule];

@Component({
  selector: 'org-language-toggler',
  template: `
    <div class="flex justify-content-between align-items-center">
      {{ 'settings.selectLanguage' | translate }}
      <p-dropdown
        optionLabel="label"
        optionValue="value"
        [options]="options"
        [(ngModel)]="languageValue"
        (onChange)="onLangChange($event)" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class LanguageTogglerComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly translateService = inject(TranslateService);
  private readonly config: PrimeNGConfig = inject(PrimeNGConfig);

  languageValue = localStorage.getItem(lang) ?? 'pl';
  readonly options = [
    { label: 'PL', value: 'pl' },
    { label: 'EN', value: 'en' },
  ];

  onLangChange({ value }: SelectButtonChangeEvent): void {
    localStorage.setItem(lang, value ?? 'pl');
    this.translateService.use(value ?? 'pl');
    this.translateService
      .get('primeng')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => this.config.setTranslation(res));
  }
}
