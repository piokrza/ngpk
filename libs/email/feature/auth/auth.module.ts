import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from '@ngpk/email/feature/auth';
import { AuthService } from '@ngpk/email/service';
import { UniqueUsername, MatchPassword } from '@ngpk/email/validator';

const imports = [CommonModule, AuthRoutingModule, ReactiveFormsModule];
const providers = [AuthService, UniqueUsername, MatchPassword];

@NgModule({ imports, providers })
export class AuthModule {}
