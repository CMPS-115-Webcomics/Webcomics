import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComicListComponent } from './comic-list/comic-list.component';
import { ComicReaderComponent } from './comic-reader/comic-reader.component';
import { ComicService } from './comic.service';
import { ComicUploadComponent } from './comic-upload/comic-upload.component';
import { ComicDetailComponent } from './comic-detail/comic-detail.component';
import { CreateComicComponent } from './create-comic/create-comic.component';
import { MaterialModule } from '../material.module';
import { SearchService } from './search.service';


@NgModule({
    imports: [
        RouterModule,
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
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
        CreateComicComponent,
    ],
    providers: [ComicService, SearchService]
})
export class ComicModule { }
