import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { APP_CONFIG, APP_SERVICE_CONFIG } from '@ngpk/email/config';
import { AuthInterceptor } from '@ngpk/email/interceptor';
import { AuthService } from '@ngpk/email/service';
import { HeaderComponent } from '@ngpk/email/shared/components';

const declarations = [AppComponent];
const imports = [BrowserModule, AppRoutingModule, RouterModule, HttpClientModule, BrowserAnimationsModule, HeaderComponent, ToastModule];
const providers = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: APP_SERVICE_CONFIG, useValue: APP_CONFIG },
  AuthService,
  MessageService,
];

@NgModule({ declarations, imports, providers, bootstrap: [AppComponent] })
export class AppModule {}
