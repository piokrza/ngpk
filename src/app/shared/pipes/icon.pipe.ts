import { Pipe, PipeTransform } from '@angular/core';
import { PrimeIcons } from 'primeng/api';

@Pipe({ name: 'icon', standalone: true })
export class IconPipe implements PipeTransform {
  private readonly CATEGORY_DIC: Record<number, { name: string; icon: string }> = {
    0: { name: 'Rental Fees', icon: PrimeIcons.DOLLAR },
    1: { name: 'Travel', icon: PrimeIcons.CAR },
    2: { name: 'Food', icon: 'fa-solid fa-bowl-food' },
    3: { name: 'Enterteinment', icon: 'fa-solid fa-tv' },
    4: { name: 'Concerts', icon: 'fa-solid fa-music' },
    5: { name: 'Salary', icon: PrimeIcons.DOLLAR },
    6: { name: 'Gifts', icon: PrimeIcons.GIFT },
  };

  public transform(categoryCode: number): string {
    return this.CATEGORY_DIC[categoryCode].icon;
  }
}
