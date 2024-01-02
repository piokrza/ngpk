import { CommonModule } from '@angular/common';
import { NgModule, Provider } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

import { AuthRoutingModule, AuthComponent } from '#auth/.';
import { LoginFormComponent, RegisterFormComponent } from '#auth/components';
import { AuthFormService, AuthApiService } from '#auth/services';

const declarations = [AuthComponent, LoginFormComponent, RegisterFormComponent];
const imports = [CommonModule, AuthRoutingModule, ReactiveFormsModule, InputTextModule, ButtonModule, PasswordModule, TranslateModule];
const providers: Provider[] = [AuthFormService, AuthApiService];

@NgModule({ declarations, imports, providers })
export default class AuthModule {}
