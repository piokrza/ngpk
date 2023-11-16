import { Directive, ElementRef } from '@angular/core';

@Directive({ selector: '[lazyImg]', standalone: true })
export class LazyImgDirective {
  public constructor(private readonly elRef: ElementRef<HTMLImageElement>) {
    const supports = 'loading' in HTMLImageElement.prototype;

    supports && this.elRef.nativeElement.setAttribute('loading', 'lazy');
  }
}
