import { Pipe, PipeTransform } from '@angular/core';
import { PrimeIcons } from 'primeng/api';

@Pipe({ name: 'icon', standalone: true })
export class IconPipe implements PipeTransform {
  private readonly CAT_ICON_DIC: Record<number, string> = {
    0: PrimeIcons.DOLLAR,
    1: PrimeIcons.CAR,
    2: 'fa-solid fa-bowl-food',
    3: 'fa-solid fa-tv',
    4: 'fa-solid fa-music',
    5: PrimeIcons.DOLLAR,
    6: PrimeIcons.GIFT,
  };

  public transform(categoryCode: number): string {
    return this.CAT_ICON_DIC[categoryCode];
  }
}
