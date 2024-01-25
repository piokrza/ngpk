import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

import { LoginFormComponent, RegisterFormComponent } from '#auth/components';
import { AuthRoutingModule, AuthComponent } from '#auth/index';
import { AuthFormService, AuthApiService } from '#auth/services';

const declarations = [AuthComponent, LoginFormComponent, RegisterFormComponent];
const imports = [CommonModule, AuthRoutingModule, ReactiveFormsModule, InputTextModule, ButtonModule, PasswordModule, TranslateModule];
const providers = [AuthFormService, AuthApiService];

@NgModule({ declarations, imports, providers })
export class AuthModule {}
