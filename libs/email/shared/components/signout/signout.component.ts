import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { tap } from 'rxjs';

import { AuthService } from '@ngpk/email/service';

const imports = [ProgressSpinnerModule];

@Component({
  selector: 'ngpk-signout',
  templateUrl: './signout.component.html',
  standalone: true,
  imports,
})
export class SignoutComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.redirectToMainPage();
  }

  redirectToMainPage(): void {
    this.authService
      .signOut$()
      .pipe(
        tap(() => this.router.navigateByUrl('/')),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
