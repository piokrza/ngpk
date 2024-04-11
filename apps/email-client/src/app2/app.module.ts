import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from '@shared/.';
import { AuthService } from '@auth/services';
import { AuthInterceptor } from '@auth/interceptors';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_CONFIG, APP_SERVICE_CONFIG } from '@core/app-config';
import { AppInitService } from '@core/app-config/app-init.service';

const declarations = [AppComponent];
const imports = [
  BrowserModule,
  AppRoutingModule,
  RouterModule,
  HttpClientModule,
  SharedModule,
  BrowserAnimationsModule,
];
const providers = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: APP_SERVICE_CONFIG, useValue: APP_CONFIG },
  { provide: APP_INITIALIZER, useFactory: injectThemeLink, deps: [AppInitService], multi: true },
  AuthService,
  MessageService,
];

@NgModule({
  declarations,
  imports,
  providers,
  bootstrap: [AppComponent],
})
export class AppModule {}

function injectThemeLink(appInitService: AppInitService): () => Promise<void> {
  return () => appInitService.injectThemeLink();
}
