import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from '@auth/auth-routing.module';
import { AuthViewComponent } from '@auth/auth-view/auth-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthFormService } from '@auth/services/auth-form.service';
import { LoginFormComponent } from '@auth/components/login-form/login-form.component';
import { RegisterFormComponent } from '@auth/components/register-form/register-form.component';
import { AuthService } from '@auth/services/auth.service';

// PrimeNg
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

const declarations: Array<any> = [AuthViewComponent, LoginFormComponent, RegisterFormComponent];
const imports: Array<any> = [CommonModule, AuthRoutingModule, ReactiveFormsModule, InputTextModule, ButtonModule];
const providers: Array<any> = [AuthFormService, AuthService];

@NgModule({ declarations, imports, providers })
export class AuthModule {}
