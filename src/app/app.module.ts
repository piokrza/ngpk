import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, EnvironmentProviders, isDevMode, NgModule, Provider } from '@angular/core';
import { provideAnalytics, getAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet, provideRouter, withViewTransitions } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppComponent, routes } from 'src/app';
import { environment } from 'src/environments/environment';

import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

import { injectThemeLink$, ThemeInitService } from '#common/services';
import { CustomTranslateHttpLoader, initializeTranslations } from '#common/utils';
import { AuthEffects } from '#store/auth';
import { CashFlowEffects } from '#store/cash-flow';
import { DriveEffects } from '#store/drive';
import { ROOT_REDUCERS } from '#store/root-reducer';
import { TaskerEffects } from '#store/tasker';

const StoreEffects = [CashFlowEffects, AuthEffects, TaskerEffects, DriveEffects];

const declarations = [AppComponent];
const imports = [
  BrowserModule,
  BrowserAnimationsModule,
  HttpClientModule,
  RouterOutlet,

  StoreModule.forRoot(ROOT_REDUCERS),
  EffectsModule.forRoot(StoreEffects),
  StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode(), connectInZone: true }),

  provideFirebaseApp(() => initializeApp(environment.firebase)),
  provideAnalytics(() => getAnalytics()),
  provideAuth(() => getAuth()),
  provideFirestore(() => getFirestore()),
  AngularFireAuthModule,

  TranslateModule.forRoot({
    loader: { provide: TranslateLoader, useClass: CustomTranslateHttpLoader },
  }),
];
const providers: Array<Provider | EnvironmentProviders> = [
  provideRouter(routes, withViewTransitions()),
  { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
  { provide: APP_INITIALIZER, useFactory: injectThemeLink$, deps: [ThemeInitService], multi: true },
  { provide: APP_INITIALIZER, useFactory: initializeTranslations, deps: [TranslateService], multi: true },
  DatePipe,
  MessageService,
  ConfirmationService,
  ScreenTrackingService,
  UserTrackingService,
  DialogService,
];

@NgModule({ declarations, imports, providers, bootstrap: [AppComponent] })
export class AppModule {}
