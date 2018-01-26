import { NgModule } from '@angular/core';
import { ComicModule } from './comic/comic.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatCardModule
} from '@angular/material';


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        ComicModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
        MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatCardModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
