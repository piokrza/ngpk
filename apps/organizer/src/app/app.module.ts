import { STORE_ROOT_REDUCERS, AppComponent, routes } from '.';
import { DatePipe } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { APP_INITIALIZER, isDevMode, NgModule } from '@angular/core';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter, RouterOutlet, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Environment } from 'apps/organizer/src/environments';
import { environment } from 'apps/organizer/src/environments/environment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

import { ConfigEffects } from '@ngpk/auth-organizer/config/store';
import { AuthEffects } from '@ngpk/auth-organizer/state';
import { CashFlowEffects } from '@ngpk/cash-flow/state';
import { httpErrorInterceptor } from '@ngpk/core/interceptor';
import { CustomTranslateHttpLoader, initializeTranslations } from '@ngpk/core/util';
import { DriveEffects } from '@ngpk/drive/state';
import { OrganizerLayoutComponent } from '@ngpk/shared-ui/components';
import { TaskerEffects } from '@ngpk/tasker/state';

const declarations = [AppComponent];
const interceptors = [httpErrorInterceptor];
const storeEffects = [ConfigEffects, CashFlowEffects, AuthEffects, DriveEffects, TaskerEffects];

const imports = [
  BrowserModule,
  BrowserAnimationsModule,
  RouterOutlet,
  OrganizerLayoutComponent,
  StoreModule.forRoot(STORE_ROOT_REDUCERS),
  EffectsModule.forRoot(storeEffects),
  StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode(), connectInZone: true }),
  provideFirebaseApp(() => initializeApp(environment.firebase)),
  provideAnalytics(() => getAnalytics()),
  provideAuth(() => getAuth()),
  provideFirestore(() => getFirestore()),
  AngularFireAuthModule,
  TranslateModule.forRoot({ loader: { provide: TranslateLoader, useClass: CustomTranslateHttpLoader } }),
];

const providers = [
  DatePipe,
  DialogService,
  MessageService,
  ConfirmationService,
  UserTrackingService,
  ScreenTrackingService,
  provideHttpClient(withInterceptors(interceptors)),
  provideRouter(routes, withViewTransitions(), withComponentInputBinding()),
  { provide: Environment, useValue: environment },
  { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
  { provide: APP_INITIALIZER, useFactory: initializeTranslations, multi: true },
];

@NgModule({ declarations, imports, providers, bootstrap: [AppComponent] })
export class AppModule {}
