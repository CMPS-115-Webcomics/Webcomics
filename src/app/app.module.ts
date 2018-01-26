import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComicModule } from './comic/comic.module';
import { environment } from '../environments/environment';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SigninPageComponent } from './signin-page/signin-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';

@NgModule({
    declarations: [
        AppComponent,
        BsNavbarComponent,
        HomePageComponent,
        SigninPageComponent,
        SignupPageComponent,
    ],
    imports: [
        ComicModule,
        BrowserModule,
        AppRoutingModule,
        ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
        NgbModule.forRoot()
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
