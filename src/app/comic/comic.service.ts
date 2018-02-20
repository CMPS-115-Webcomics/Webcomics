import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comic, Page, Chapter, Volume } from './comic';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { apiURL } from '../url';
import { AuthenticationService } from '../user/authentication.service';
import { Router } from '@angular/router';
import { ComicStoreService, ComicData, ComicListData } from './comic-store.service';

@Injectable()
export class ComicService {
//private static localStoragePrefix = 'comics-cache-';

    public comics: Comic[] = [];
    public comic: Comic;
    public myComics: Comic[] = [];

    constructor(
        private http: HttpClient,
        private router: Router,
        private auth: AuthenticationService,
        private comicStoreService: ComicStoreService
    ) {
    /*
        auth.onAuth((username) => {
            if (username)
                this.loadMyComics();
            else
                this.myComics.length = 0;
        });
*/
    }

    public createComic(title: string, comicURL: string, description: string, thumbnail: File) {
        let body = new FormData();

        body.set('title', title);
        body.set('comicURL', comicURL);
        body.set('description', description);
        body.set('thumbnail', thumbnail);

        this.http.post(`${apiURL}/api/comics/create`, body, { headers: this.auth.getAuthHeader() })
            .toPromise()
            .then(() => {
                this.router.navigate([`comic/${comicURL}/upload`]);
                this.loadComics();
                this.loadMyComics();
            })
            .catch(console.error);
    }

    public uploadPage(file: File, page: Page) {
        let formData = new FormData();

        page.imgURL = null;

        for (let attr in page) {
            formData.append(attr, page[attr]);
        }
        formData.append('comicID', this.comic.comicID.toString());

        return this.http.post(`${apiURL}/api/comics/addPage`, formData, { headers: this.auth.getAuthHeader() })
            .toPromise()
            .catch(console.error);
    }

    public getComic(comicURL: string): Promise<Comic> {
        return this.http.get(apiURL + '/api/comics/get/' + comicURL)
            .toPromise().then((data: ComicData) => {
                this.comicStoreService.cacheComic(data);
                this.comic = this.comicStoreService.unpackComic(data);
                return this.comic;
            });
    }

    loadComicType(name: string, storage: Array<Comic>) {
        return this.comicStoreService.unstoreComicList(name);
        //console.log(storage);
        /*
        const unloader = (comics: Comic[]) => {
            storage.length = 0;
            for (let comic of comics) {
                storage.push(comic);
                //this.comicStoreService.cacheComic(comic.comicURL, this.comicStoreService.packComic(comic));
            }
        };

        this.comicStoreService.unstoreComicList(name).then(function (cached: Comic[]) {
            console.log("hello");
            console.log(cached);
            //unloader(cached);
            this.http.get(apiURL + '/api/comics/' + name, {
                headers: this.auth.getAuthHeader()
            }) .toPromise()
                .then((data: Array<ComicListData>) => {
                    unloader(data.map(this.comicStoreService.unpackComicListItem));
                    //this.comicStoreService.storeComicList(this.comics, 'comics');
                    this.comicStoreService.storeComicList(storage, name);
                });
        });
        */
    }

    public getCachedComic(comicURL: string) {
        return this.comicStoreService.getCachedComic(comicURL);
    }

    public loadMyComics() {
        this.loadComicType('myComics', this.myComics);
    }

    public loadComics() {
        this.loadComicType('comicList', this.comics);
    }
}


