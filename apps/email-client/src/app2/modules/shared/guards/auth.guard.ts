import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, UrlTree } from '@angular/router';
import { map, Observable, skipWhile, tap } from 'rxjs';
import { AuthState } from '@auth/state';
import { AuthService } from '@auth/services';
import { CheckAuthResponse } from '@auth/models';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private authState: AuthState, private router: Router, private authService: AuthService) {}

  canLoad(): Observable<boolean> {
    return this.authState.getSignedIn$().pipe(
      skipWhile((signedIn) => signedIn === null),
      tap((authenticated: boolean) => !authenticated && this.router.navigateByUrl('/'))
    );
  }

  canActivate(): Observable<boolean> {
    return this.authService.checkAuth$().pipe(
      tap(({ authenticated }: CheckAuthResponse) => authenticated && this.router.navigateByUrl('/inbox')),
      map(({ authenticated }: CheckAuthResponse) => !authenticated)
    );
  }
}
