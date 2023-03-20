import { APP_INITIALIZER, isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { AppInitService } from '@common/services/app-init.service';
import { injectThemeLink$ } from '@common/utils/injectThemeLink';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ContainerComponent } from '@standalone/components/container/container.component';
import { UiModule } from '@ui/ui.module';

// PrimeNg
import { ButtonModule } from 'primeng/button';

const declarations: Array<any> = [AppComponent];
const imports: Array<any> = [
  BrowserModule,
  BrowserAnimationsModule,
  AppRoutingModule,
  UiModule,
  ContainerComponent,
  ButtonModule,

  // NgRx
  StoreModule.forRoot({}, {}),
  EffectsModule.forRoot(),
  StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
];
const providers: Array<any> = [
  {
    provide: APP_INITIALIZER,
    useFactory: injectThemeLink$,
    deps: [AppInitService],
    multi: true,
  },
];

@NgModule({ declarations, imports, providers, bootstrap: [AppComponent] })
export class AppModule {}
