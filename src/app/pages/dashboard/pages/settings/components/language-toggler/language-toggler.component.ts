import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { SelectButtonChangeEvent, SelectButtonModule } from 'primeng/selectbutton';

import { AppLanguages, LANG } from '#common/constants';
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
        [options]="languages"
        optionLabel="label"
        optionValue="value" />
    </div>
  `,
  styleUrls: ['./language-toggler.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class LanguageTogglerComponent {
  private readonly translateService: TranslateService = inject(TranslateService);

  private readonly config: PrimeNGConfig = inject(PrimeNGConfig);
  public readonly languages: Language[] = AppLanguages;
  public languageValue: Language['value'] = (localStorage.getItem(LANG) as Language['value']) ?? 'pl';

  public onLangChange({ value }: SelectButtonChangeEvent): void {
    localStorage.setItem(LANG, value);
    this.translateService.use(value);
    this.translateService.get('primeng').subscribe((res) => this.config.setTranslation(res));
  }
}
