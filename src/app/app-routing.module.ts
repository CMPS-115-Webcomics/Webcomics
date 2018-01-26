import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComicListComponent } from './comic/comic-list/comic-list.component';
import { ComicReaderComponent } from'./comic/comic-reader/comic-reader.component';
import { ComicDetailComponent } from './comic/comic-detail/comic-detail.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SigninPageComponent } from './signin-page/signin-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';

const routes: Routes = [
    { path: 'comics', component: ComicListComponent },
    { path: 'comic/:comicURL', component: ComicDetailComponent },
    { path: 'comic/:comicURL/:page', component: ComicReaderComponent },
    { path: 'comic/:comicURL/:chapter/:page', component: ComicReaderComponent },
    { path: 'comic/:comicURL/:volume/:chapter/:page', component: ComicReaderComponent },
    { path: 'signin', component: SigninPageComponent },
    { path: 'signup', component: SignupPageComponent },
    { path: '', component: HomePageComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
