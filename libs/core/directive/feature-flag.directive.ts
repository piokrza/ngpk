import { Directive, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { Environment } from 'apps/organizer-client/src/environments';

import { Feature } from '@ngpk/core/model';

@Directive({ selector: '[featureEnabled]', standalone: true })
export class FeatureFlagDirective {
  private readonly environment = inject(Environment);
  private readonly templateRef = inject(TemplateRef<unknown>);
  private readonly viewContainerRef = inject(ViewContainerRef);

  @Input({ required: true }) set featureEnabled(featureName: Feature) {
    if (this.environment.featureFlags[featureName]) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }
}
