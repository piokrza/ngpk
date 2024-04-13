import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PrimeIcons } from 'primeng/api';
import { AutoFocusModule } from 'primeng/autofocus';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';

const imports = [InputTextModule, FormsModule, TranslateModule, AutoFocusModule, DividerModule];

@Component({
  selector: 'ngpk-search',
  templateUrl: './search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class SearchComponent {
  searchField = '';
  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;

  search(): void {
    const baseUrl = 'https://www.google.pl/search?q=';
    window.open(`${baseUrl}${this.searchField.replace(/\s/g, '+')}`);
    this.searchField = '';
  }
}
