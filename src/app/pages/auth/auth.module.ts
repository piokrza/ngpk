import { CommonModule } from '@angular/common';
import { NgModule, Provider } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule, AuthViewComponent } from '@pages/auth';
import { LoginFormComponent, RegisterFormComponent } from '@pages/auth/components';
import { AuthFormService, AuthService } from '@pages/auth/services';

// PrimeNg
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

const declarations: Array<any> = [AuthViewComponent, LoginFormComponent, RegisterFormComponent];
const imports: Array<any> = [
  CommonModule,
  AuthRoutingModule,
  ReactiveFormsModule,
  InputTextModule,
  ButtonModule,
  PasswordModule,
];
const providers: Array<Provider> = [AuthFormService, AuthService];

@NgModule({ declarations, imports, providers })
export class AuthModule {}
