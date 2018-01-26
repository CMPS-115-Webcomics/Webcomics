import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComicListComponent } from './comic/comic-list/comic-list.component';
import { ComicReaderComponent } from'./comic/comic-reader/comic-reader.component';

const routes: Routes = [
    { path: 'comics', component: ComicListComponent },
    { path: 'comic/:comicURL', component: ComicReaderComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
