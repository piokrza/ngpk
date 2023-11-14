import { Observable } from 'rxjs';

import { AppInitService } from '#common/services';

export function injectThemeLink$(appInitService: AppInitService): () => Observable<HTMLLinkElement> {
  return () => appInitService.injectThemeLink$();
}
