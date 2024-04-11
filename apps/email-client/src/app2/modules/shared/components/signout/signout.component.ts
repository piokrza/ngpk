import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services';
import { DestroyComponent } from '@standalone/components';
import { takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
})
export class SignoutComponent extends DestroyComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.redirectToMainPage();
  }

  redirectToMainPage(): void {
    this.authService
      .signOut$()
      .pipe(
        tap(() => this.router.navigateByUrl('/')),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
