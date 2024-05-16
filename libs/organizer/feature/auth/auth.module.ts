import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

import { AuthApiService } from '@ngpk/organizer/api';
import { AuthRoutingModule, AuthComponent } from '@ngpk/organizer/feature/auth';
import { AuthFormService } from '@ngpk/organizer/service';
import { LoginFormComponent, RegisterFormComponent } from '@ngpk/organizer/shared';

const declarations = [AuthComponent, LoginFormComponent, RegisterFormComponent];
const imports = [CommonModule, AuthRoutingModule, ReactiveFormsModule, InputTextModule, ButtonModule, PasswordModule, TranslateModule];
const providers = [AuthFormService, AuthApiService];

@NgModule({ declarations, imports, providers })
export class AuthModule {}
