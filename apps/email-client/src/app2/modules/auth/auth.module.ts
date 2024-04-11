import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from '@auth/.';
import { SharedModule } from '@shared/.';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@auth/services/auth.service';
import { UniqueUsername, MatchPassword } from '@auth/validators';
import { SigninComponent, SignupComponent } from '@auth/components';

const declarations = [SigninComponent, SignupComponent];
const imports = [CommonModule, AuthRoutingModule, SharedModule, ReactiveFormsModule];
const providers = [AuthService, UniqueUsername, MatchPassword];

@NgModule({
  declarations,
  imports,
  providers,
})
export class AuthModule {}
