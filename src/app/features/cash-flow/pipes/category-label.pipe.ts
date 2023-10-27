import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({ name: 'categoryLabel' })
export class CategoryLabelPipe implements PipeTransform {
  private readonly translateService: TranslateService = inject(TranslateService);

  public transform(categoryName: string): string {
    return this.translateService.instant('categories.' + categoryName);
  }
}
