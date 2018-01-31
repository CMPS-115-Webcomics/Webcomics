import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comic, Page, Chapter, Volume } from './comic';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { apiURL } from '../url';
import { AuthenticationService } from '../user/authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class ComicService {
    public comics: Comic[] = [];
    public comic: Comic;
    public myComics: Comic[] = [];

    constructor(
        private http: HttpClient,
        private router: Router,
        private auth: AuthenticationService
    ) {
        auth.onAuth(() => {
            this.loadMyComics();
        });
    }

    createComic(title: string, comicURL: string, description: string, thumbnail: File) {
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

    uploadPage(file: File, page: Page) {
        let formData = new FormData();

        page.imgURL = null;

        for (let attr in page) {
            formData.append(attr, page[attr]);
        }
        formData.append('comicID', this.comic.comicID.toString());

        this.http.post(`${apiURL}/api/comics/addPage`, formData, { headers: this.auth.getAuthHeader() })
            .toPromise()
            .then(console.log)
            .catch(console.error);
    }

    private unwrapComic(entry) {
        return new Comic(
            entry.comicid,
            entry.accountid,
            entry.title,
            entry.comicurl,
            entry.description,
            entry.thumbnailurl,
        );
    }

    loadMyComics() {
        this.http.get(apiURL + '/api/comics/myComics', { headers: this.auth.getAuthHeader() })
            .toPromise()
            .then((data: Array<any>) => {
                this.myComics.length = 0;
                console.log('mycomics', data);
                for (let entry of data) {
                    this.myComics.push(this.unwrapComic(entry));
                }
            });
    }

    loadComics() {
        this.http.get(apiURL + '/api/comics/list')
            .toPromise()
            .then((data: Array<any>) => {
                this.comics.length = 0;
                for (let entry of data) {
                    this.comics.push(this.unwrapComic(entry));
                }
            });
    }

    getComic(comicURL: string): Observable<Comic> {
        return this.http.get(apiURL + '/api/comics/get/' + comicURL).map(data => {
            let entry = data;
            console.log(entry);

            let chapters: Chapter[] = [];
            let volumes: Volume[] = [];
            let pages: Page[] = [];

            for (let chapter of entry['chapters']) {
                let c: Chapter = new Chapter(
                    chapter.chapterid,
                    chapter.volumeid,
                    chapter.chapternumber,
                );
                chapters.push(c);
            }

            for (let volume of entry['volumes']) {
                let v: Volume = new Volume(
                    volume.volumeid,
                    volume.volumenumber,
                );
                volumes.push(v);
            }

            for (let page of entry['pages']) {
                let p: Page = new Page(
                    page.pageid,
                    page.pagenumber,
                    page.chapterid,
                    page.imgurl,
                    page.alttext
                );
                pages.push(p);
            }


            this.comic = new Comic(
                entry['comicid'],
                entry['accountid'],
                entry['title'],
                entry['comicurl'],
                entry['description'],
                entry['thumbnailurl'],
                volumes,
                chapters,
                pages
            );

            return this.comic;
        });
    }

}
