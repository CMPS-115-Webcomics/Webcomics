import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import { ComicsComponent } from './comics/comics.component';
import { ComicViewComponent } from './comic-view/comic-view.component';
import { ComicService } from './comic.service';

@NgModule({
    declarations: [
        AppComponent,
        ComicsComponent,
        ComicViewComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
    ],
    providers: [ ComicService ],
    bootstrap: [AppComponent]
})
export class AppModule { }
