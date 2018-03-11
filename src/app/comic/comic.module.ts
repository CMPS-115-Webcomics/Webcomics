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
import { ComicStoreService } from './comic-store.service';
import { ImagesService } from './images.service';
import { HotkeyModule } from 'angular2-hotkeys';
import { EditComicComponent } from './edit-comic/edit-comic.component';


@NgModule({
    imports: [
        RouterModule,
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        HotkeyModule
    ],
    exports: [
        ComicListComponent,
        ComicReaderComponent,
        EditComicComponent
    ],
    declarations: [
        ComicListComponent,
        ComicReaderComponent,
        ComicUploadComponent,
        ComicDetailComponent,
        CreateComicComponent,
        EditComicComponent
    ],
    providers: [ComicService, SearchService, ImagesService, ComicStoreService]
})
export class ComicModule { }
