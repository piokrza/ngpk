import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { SelectButtonChangeEvent, SelectButtonModule } from 'primeng/selectbutton';
import { take } from 'rxjs';

import { LANG } from '#common/constants';
import { Language } from '#common/models';

const imports = [SelectButtonModule, FormsModule, TranslateModule];

@Component({
  selector: 'ctrl-language-toggler',
  template: `
    <div class="container">
      {{ 'settings.selectLanguage' | translate }}
      <p-selectButton
        (onChange)="onLangChange($event)"
        [(ngModel)]="languageValue"
        [options]="[
          { label: 'primeng.pl' | translate, value: 'pl' },
          { label: 'primeng.en' | translate, value: 'en' }
        ]"
        optionLabel="label"
        optionValue="value" />
    </div>
  `,
  styleUrl: './language-toggler.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class LanguageTogglerComponent {
  private readonly translateService: TranslateService = inject(TranslateService);

  public languageValue: Language['value'] = (localStorage.getItem(LANG) as Language['value']) ?? 'pl';
  private readonly config: PrimeNGConfig = inject(PrimeNGConfig);

  public onLangChange({ value }: SelectButtonChangeEvent): void {
    localStorage.setItem(LANG, value);
    this.translateService.use(value);
    this.translateService
      .get('primeng')
      .pipe(take(1))
      .subscribe((res) => this.config.setTranslation(res));
  }
}
