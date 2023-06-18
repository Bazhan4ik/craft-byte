import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, RecaptchaV3Module, HttpClientModule],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, { provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.siteKey }],
    bootstrap: [AppComponent],
})
export class AppModule { }
