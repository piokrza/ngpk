import { HttpClientModule, HttpClient } from '@angular/common/http';
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
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AppComponent, routes } from 'src/app';
import { environment } from 'src/environments/environment';

import { AppInitService } from '#common/services';
import { HttpLoaderFactory, initializeTranslations, injectThemeLink$ } from '#common/utils';
import { AuthEffects } from '#store/auth';
import { CashFlowEffects } from '#store/cash-flow';
import { CategoriesEffects } from '#store/categories';
import { ROOT_REDUCERS } from '#store/root-reducer';
import { TaskerEffects } from '#store/tasker';

const StoreEffects = [CategoriesEffects, CashFlowEffects, AuthEffects, TaskerEffects];

const declarations = [AppComponent];
const imports = [
  BrowserModule,
  BrowserAnimationsModule,
  HttpClientModule,
  RouterOutlet,

  // NgRx
  StoreModule.forRoot(ROOT_REDUCERS),
  EffectsModule.forRoot(StoreEffects),
  StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),

  // Firebase
  provideFirebaseApp(() => initializeApp(environment.firebase)),
  provideAnalytics(() => getAnalytics()),
  provideAuth(() => getAuth()),
  provideFirestore(() => getFirestore()),
  AngularFireAuthModule,

  // Translate
  TranslateModule.forRoot({
    loader: { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient] },
  }),
];
const providers: Array<Provider | EnvironmentProviders> = [
  { provide: APP_INITIALIZER, useFactory: injectThemeLink$, deps: [AppInitService], multi: true },
  { provide: APP_INITIALIZER, useFactory: initializeTranslations, deps: [TranslateService], multi: true },
  { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
  MessageService,
  ConfirmationService,
  ScreenTrackingService,
  UserTrackingService,
  DialogService,
  provideRouter(routes, withViewTransitions()),
];

@NgModule({ declarations, imports, providers, bootstrap: [AppComponent] })
export class AppModule {}
