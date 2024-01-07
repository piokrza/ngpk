import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({ name: 'categoryLabel', standalone: true })
export class CategoryLabelPipe implements PipeTransform {
  readonly #translateService = inject(TranslateService);

  public transform(categoryName: string): string {
    return this.#translateService.instant('categories.' + categoryName);
  }
}
