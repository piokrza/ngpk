/* eslint-disable @typescript-eslint/no-this-alias */
import { Directive, Inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';

type Context<T> = ReturnType<LetDirective<T>['createContext']>;

@Directive({ selector: '[let]', standalone: true })
export class LetDirective<T> {
  constructor(@Inject(ViewContainerRef) viewContainer: ViewContainerRef, @Inject(TemplateRef) templateRef: TemplateRef<Context<T>>) {
    viewContainer.createEmbeddedView(templateRef, this.createContext());
  }

  @Input({ required: true }) let!: T;

  static ngTemplateContextGuard<T>(_dir: LetDirective<T>, _ctx: unknown): _ctx is LetDirective<T> {
    return true;
  }

  private createContext(): { readonly $implicit: T; readonly govLet: T } {
    const directive: this = this;

    return {
      get $implicit(): T {
        return directive.let;
      },
      get govLet(): T {
        return directive.let;
      },
    };
  }
}
