import { Pipe, PipeTransform } from '@angular/core';

import { CATEGORY_DIC } from '#common/dictionaries';

@Pipe({ name: 'icon', standalone: true })
export class IconPipe implements PipeTransform {
  transform(categoryCode: number): string {
    return CATEGORY_DIC[categoryCode].icon;
  }
}
