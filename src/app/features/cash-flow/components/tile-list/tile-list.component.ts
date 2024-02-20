import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { PrimeIcons } from 'primeng/api';
import { MultiSelectChangeEvent } from 'primeng/multiselect';

import { CashFlow, Category } from '#cash-flow/models';

@Component({
  selector: 'org-tile-list',
  templateUrl: './tile-list.component.html',
  styleUrl: './tile-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
