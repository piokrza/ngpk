import { APP_INITIALIZER, isDevMode, NgModule } from '@angular/core';
import { provideAnalytics, getAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { AppInitService } from '@common/services/app-init.service';
import { injectThemeLink$ } from '@common/utils/inject-theme-link';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ContainerComponent } from '@shared/components/container/container.component';
import { AuthEffects } from '@store/auth/auth.effects';
import { CashFlowEffects } from '@store/cash-flow/cash-flow.effects';
import { CategoriesEffects } from '@store/categories/categories.effects';
import { ROOT_REDUCERS } from '@store/root-reducer';
import { ParentFormComponent } from '@shared/components/parent-form/parent-form.component';

// PrimeNg
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { environment } from 'src/environments/environment';

const StoreEffects: Array<any> = [CategoriesEffects, CashFlowEffects, AuthEffects];
const declarations: Array<any> = [AppComponent];
const imports: Array<any> = [
  BrowserModule,
  BrowserAnimationsModule,
  AppRoutingModule,
  ContainerComponent,
  ButtonModule,
  ConfirmDialogModule,
  ToastModule,
  ParentFormComponent,

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
const providers: Array<any> = [
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
