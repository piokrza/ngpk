import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { ButtonModule } from 'primeng/button';

const declarations: Array<any> = [AppComponent];
const imports: Array<any> = [BrowserModule, AppRoutingModule, ButtonModule];
const providers: Array<any> = [];

@NgModule({ declarations, imports, providers, bootstrap: [AppComponent] })
export class AppModule {}
