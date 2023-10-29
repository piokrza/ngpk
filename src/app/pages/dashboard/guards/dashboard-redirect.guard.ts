import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { AppPaths } from '#common/enums';
import { DashobardPath } from '#pages/dashboard/enums';

export const DashboardRedirectGuard: CanActivateFn = (_: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree => {
  const router: Router = inject(Router);

  if (state.url === `/${AppPaths.DASHBOARD}`) {
    return router.parseUrl(`${AppPaths.DASHBOARD}/${DashobardPath.OVERVIEW}`);
  }

  return true;
};
