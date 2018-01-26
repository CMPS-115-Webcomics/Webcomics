import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { ComicListComponent } from './comic-list/comic-list.component';
import { ComicReaderComponent } from './comic-reader/comic-reader.component';
import { ComicService } from './comic.service';
import { ComicUploadComponent } from './comic-upload/comic-upload.component';
import { ComicDetailComponent } from './comic-detail/comic-detail.component';

@NgModule({
    imports: [
        RouterModule,
        BrowserModule,
        HttpClientModule,
    ],
    exports: [
        ComicListComponent,
        ComicReaderComponent,
    ],
    declarations: [
        ComicListComponent,
        ComicReaderComponent,
        ComicUploadComponent,
        ComicDetailComponent,
        ],
        providers: [ ComicService ],
})
export class ComicModule { }