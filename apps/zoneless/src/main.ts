import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig, AppComponent } from 'apps/zoneless/src/app';

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
