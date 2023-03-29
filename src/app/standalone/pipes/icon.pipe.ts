import { Pipe, PipeTransform } from '@angular/core';
import { CATEGORIES_ICONS } from '@common/dictionaries/category.dictionary';

@Pipe({ name: 'icon', standalone: true, pure: true })
export class IconPipe implements PipeTransform {
  transform(categoryCode: number): string {
    return CATEGORIES_ICONS[categoryCode];
  }
}
