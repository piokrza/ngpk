import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'apps/email-client/src/app/app-routing.module';
import { AppComponent } from 'apps/email-client/src/app/app.component';
import { Environment } from 'apps/email-client/src/environments';
import { environment } from 'apps/email-client/src/environments/environment';
import { MessageService } from 'primeng/api';

import { AuthInterceptor } from '@ngpk/email/interceptor';
import { AuthService } from '@ngpk/email/service';
import { LayoutComponent } from '@ngpk/email/shared/components';

const declarations = [AppComponent];
const imports = [BrowserModule, AppRoutingModule, RouterModule, HttpClientModule, BrowserAnimationsModule, LayoutComponent];
const providers = [
  { provide: Environment, useValue: environment },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  AuthService,
  MessageService,
];

@NgModule({ declarations, imports, providers, bootstrap: [AppComponent] })
export class AppModule {}
