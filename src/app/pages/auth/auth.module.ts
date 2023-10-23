import { CommonModule } from '@angular/common';
import { NgModule, Provider } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

import { AuthRoutingModule, AuthViewComponent } from '#pages/auth';
import { LoginFormComponent, RegisterFormComponent } from '#pages/auth/components';
import { AuthFormService, AuthService } from '#pages/auth/services';

const declarations = [AuthViewComponent, LoginFormComponent, RegisterFormComponent];
const imports = [CommonModule, AuthRoutingModule, ReactiveFormsModule, InputTextModule, ButtonModule, PasswordModule];
const providers: Provider[] = [AuthFormService, AuthService];

@NgModule({ declarations, imports, providers })
export default class AuthModule {}
