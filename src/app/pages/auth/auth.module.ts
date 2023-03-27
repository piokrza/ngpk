import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from '@auth/auth-routing.module';
import { AuthViewComponent } from '@auth/auth-view/auth-view.component';
import { LoginFormComponent } from '@auth/components/login-form/login-form.component';
import { RegisterFormComponent } from '@auth/components/register-form/register-form.component';
import { AuthFormService } from '@auth/services/auth-form.service';
import { AuthService } from '@auth/services/auth.service';

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
const providers: Array<any> = [AuthFormService, AuthService];

@NgModule({ declarations, imports, providers })
export class AuthModule {}
