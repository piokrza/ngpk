import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { IncomesEffects } from '@app/store/cash-flow/cash-flow.effects';
import { AppInitService } from '@common/services/app-init.service';
import { injectThemeLink$ } from '@common/utils/injectThemeLink';
import { UiModule } from '@features/ui/ui.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ContainerComponent } from '@standalone/components/container/container.component';
import { CategoriesEffects } from '@store/categories/categories.effects';
import { ROOT_REDUCERS } from '@store/root-reducer';

// PrimeNg
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

const StoreEffects: Array<any> = [CategoriesEffects, IncomesEffects];
const declarations: Array<any> = [AppComponent];
const imports: Array<any> = [
  BrowserModule,
  BrowserAnimationsModule,
  AppRoutingModule,
  UiModule,
  ContainerComponent,
  ButtonModule,
  HttpClientModule,
  ToastModule,

  // NgRx
  StoreModule.forRoot(ROOT_REDUCERS),
  EffectsModule.forRoot(StoreEffects),
  StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
];
const providers: Array<any> = [
  {
    provide: APP_INITIALIZER,
    useFactory: injectThemeLink$,
    deps: [AppInitService],
    multi: true,
  },
  MessageService,
];

@NgModule({ declarations, imports, providers, bootstrap: [AppComponent] })
export class AppModule {}
