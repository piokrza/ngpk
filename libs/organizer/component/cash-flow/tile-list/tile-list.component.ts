import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MultiSelectChangeEvent, MultiSelectModule } from 'primeng/multiselect';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { TileComponent } from '@ngpk/organizer/component/cash-flow';
import { CashFlow, Category } from '@ngpk/organizer/model';
import { ContainerComponent } from '@ngpk/shared-ui/components';

const imports = [TranslateModule, MultiSelectModule, ButtonModule, TileComponent, ContainerComponent, ProgressSpinnerModule];

@Component({
  selector: 'ngpk-tile-list',
  templateUrl: './tile-list.component.html',
  styleUrl: './tile-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class TileListComponent {
  @Input({ required: true }) cashFlowList!: CashFlow[];
  @Input({ required: true }) isLoading!: boolean;
  @Input({ required: true }) isIncomeMode!: boolean;
  @Input({ required: true }) categories!: Category[];

  @Output() addCashFlow = new EventEmitter<boolean>();
  @Output() removeCashFlow = new EventEmitter<string>();
  @Output() updateCashFlow = new EventEmitter<CashFlow>();
  @Output() categoryChange = new EventEmitter<string[]>();

  readonly PrimeIcons: typeof PrimeIcons = PrimeIcons;

  onCategoryFilterChange({ value }: MultiSelectChangeEvent): void {
    const categoryIds: string[] = value.map((category: Category) => category.id);
    this.categoryChange.emit(categoryIds);
  }
}
