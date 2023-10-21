import { AppInitService } from '#common/services/app-init.service';
import { Observable } from 'rxjs';

export function injectThemeLink$(appInitService: AppInitService): () => Observable<HTMLLinkElement> {
  return (): Observable<HTMLLinkElement> => appInitService.injectThemeLink$();
}
