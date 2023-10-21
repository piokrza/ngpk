import { Observable } from 'rxjs';

import { AppInitService } from '#common/services/app-init.service';

export function injectThemeLink$(appInitService: AppInitService): () => Observable<HTMLLinkElement> {
  return (): Observable<HTMLLinkElement> => appInitService.injectThemeLink$();
}
