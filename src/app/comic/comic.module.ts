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

import {
    MatIconModule, MatCardModule, MatButtonModule, MatTooltipModule, MatExpansionModule, MatFormFieldModule, MatInputModule,
    MatDividerModule
} from '@angular/material';

@NgModule({
    imports: [
        RouterModule,
        BrowserModule,
        HttpClientModule,
        MatIconModule,
        MatCardModule,
        MatButtonModule,
        MatTooltipModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatDividerModule
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
    providers: [ComicService]
})
export class ComicModule { }
