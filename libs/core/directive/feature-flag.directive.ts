import { Directive, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { Environment } from 'apps/organizer/src/environments';

import { Feature } from '@ngpk/core/model';

@Directive({ selector: '[featureEnabled]', standalone: true })
export class FeatureFlagDirective {
  private readonly environment = inject(Environment);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly templateRef: TemplateRef<unknown> = inject(TemplateRef<unknown>);

  @Input({ required: true }) set featureEnabled(featureName: Feature) {
    if (this.environment.featureFlags[featureName]) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }
}
