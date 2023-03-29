import { Pipe, PipeTransform } from '@angular/core';
import { CATEGORY_ICONS } from '@common/dictionaries/category.dictionary';

@Pipe({ name: 'icon', standalone: true, pure: true })
export class IconPipe implements PipeTransform {
  transform(categoryCode: number): string {
    return CATEGORY_ICONS[categoryCode];
  }
}
