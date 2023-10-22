import { APP_INITIALIZER, isDevMode, NgModule, Provider } from '@angular/core';
import { provideAnalytics, getAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment';

import { AppInitService } from '#common/services/app-init.service';
import { injectThemeLink$ } from '#common/utils/inject-theme-link';
import { UiModule } from '#shared/ui';
import { AuthEffects } from '#store/auth/auth.effects';
import { CashFlowEffects } from '#store/cash-flow/cash-flow.effects';
import { CategoriesEffects } from '#store/categories/categories.effects';
import { ROOT_REDUCERS } from '#store/root-reducer';

const StoreEffects = [CategoriesEffects, CashFlowEffects, AuthEffects];

const declarations = [AppComponent];

const imports = [
  BrowserModule,
  BrowserAnimationsModule,
  AppRoutingModule,
  UiModule,

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
];
const providers: Array<Provider> = [
  {
    provide: APP_INITIALIZER,
    useFactory: injectThemeLink$,
    deps: [AppInitService],
    multi: true,
  },
  { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
  MessageService,
  ConfirmationService,
  ScreenTrackingService,
  UserTrackingService,
  DialogService,
];

@NgModule({ declarations, imports, providers, bootstrap: [AppComponent] })
export class AppModule {}
