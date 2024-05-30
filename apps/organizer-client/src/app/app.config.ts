import { appRoutes } from '.';
import { DatePipe } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter, RouterOutlet, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Environment } from 'apps/organizer-client/src/environments';
import { environment } from 'apps/organizer-client/src/environments/environment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

import { httpErrorInterceptor } from '@ngpk/core/interceptor';
import { CustomTranslateHttpLoader, initializeTranslations } from '@ngpk/core/util';
import { LayoutComponent } from '@ngpk/organizer/component/shared';
import { STORE_ROOT_REDUCERS } from '@ngpk/organizer/state';
import { AuthEffects } from '@ngpk/organizer/state/auth';
import { CashFlowEffects } from '@ngpk/organizer/state/cash-flow';
import { ConfigEffects } from '@ngpk/organizer/state/config';
import { DriveEffects } from '@ngpk/organizer/state/drive';
import { TaskerEffects } from '@ngpk/organizer/state/tasker';

const interceptors = [httpErrorInterceptor];
const storeEffects = [ConfigEffects, CashFlowEffects, AuthEffects, DriveEffects, TaskerEffects];

export const appConfig: ApplicationConfig = {
  providers: [
    DatePipe,
    RouterOutlet,
    DialogService,
    MessageService,
    ConfirmationService,
    UserTrackingService,
    AngularFireAuthModule,
    ScreenTrackingService,
    LayoutComponent,
    provideStore(STORE_ROOT_REDUCERS),
    provideEffects(storeEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    provideHttpClient(withInterceptors(interceptors)),
    provideRouter(appRoutes, withViewTransitions(), withComponentInputBinding()),
    importProvidersFrom([
      TranslateModule.forRoot({ loader: { provide: TranslateLoader, useClass: CustomTranslateHttpLoader } }),
      BrowserModule,
      BrowserAnimationsModule,
    ]),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    { provide: Environment, useValue: environment },
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    { provide: APP_INITIALIZER, useFactory: initializeTranslations, multi: true },
  ],
};
