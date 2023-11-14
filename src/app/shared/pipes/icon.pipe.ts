import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'icon', standalone: true })
export class IconPipe implements PipeTransform {
  private readonly CATEGORY_DIC: Record<number, { name: string; icon: string }> = {
    0: { name: 'Rental Fees', icon: 'fa-solid fa-dollar-sign' },
    1: { name: 'Travel', icon: 'fa-solid fa-plane' },
    2: { name: 'Food', icon: 'fa-solid fa-bowl-food' },
    3: { name: 'Enterteinment', icon: 'fa-solid fa-tv' },
    4: { name: 'Concerts', icon: 'fa-solid fa-music' },
    5: { name: 'Salary', icon: 'fa-solid fa-money-bill' },
    6: { name: 'Gifts', icon: 'fa-solid fa-gift' },
  };

  public transform(categoryCode: number): string {
    return this.CATEGORY_DIC[categoryCode].icon;
  }
}
