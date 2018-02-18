import { NgModule } from '@angular/core';
import { ComicModule } from './comic/comic.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        ComicModule,
        UserModule,
        MessageModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
        MaterialModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
