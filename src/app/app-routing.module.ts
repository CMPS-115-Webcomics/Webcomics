import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComicsComponent } from './comics/comics.component';
import { ComicReaderComponent } from'./comic-reader/comic-reader.component';

const routes: Routes = [
    { path: 'comics', component: ComicsComponent },
    { path: 'comic/:comicURL', component: ComicReaderComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
