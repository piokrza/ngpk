import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { AppPaths } from '#common/enums';
import { DashobardPaths } from '#dashboard/enums';

export const DashboardRedirectGuard: CanActivateFn = (_: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree => {
  const router: Router = inject(Router);

  return state.url === `/${AppPaths.DASHBOARD}` ? router.parseUrl(`${AppPaths.DASHBOARD}/${DashobardPaths.OVERVIEW}`) : true;
};
