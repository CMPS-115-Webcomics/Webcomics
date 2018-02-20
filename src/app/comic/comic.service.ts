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
    private static localStoragePrefix = 'comics-cache-';

    public comics: Comic[] = [];
    public comic: Comic;
    public myComics: Comic[] = [];

    constructor(
        private http: HttpClient,
        private router: Router,
        private auth: AuthenticationService
    ) {
        auth.onAuth((username) => {
            if (username)
                this.loadMyComics();
            else
                this.myComics.length = 0;
        });
    }

    public createComic(title: string, comicURL: string, description: string, thumbnail: File) {
        let body = new FormData();

        body.set('title', title);
        body.set('comicURL', comicURL);
        body.set('description', description);
        body.set('thumbnail', thumbnail);

        return this.http.post(`${apiURL}/api/comics/create`, body, { headers: this.auth.getAuthHeader() })
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

    private unpackComicListItem(entry: ComicListData) {
        return new Comic(
            entry.comicid,
            entry.accountid,
            entry.title,
            entry.comicurl,
            entry.description,
            entry.thumbnailurl,
        );
    }

    private packComicListItem(comic: Comic): ComicListData {
        return {
            comicid: comic.comicID,
            accountid: comic.accountID,
            title: comic.title,
            comicurl: comic.comicURL,
            description: comic.description,
            thumbnailurl: comic.thumbnailURL
        };
    }

    private storeComicList(comics: Comic[], loc: string) {
        let localStorageName = ComicService.localStoragePrefix + loc;
        localStorage.setItem(localStorageName,
            JSON.stringify(comics.map(this.packComicListItem)));
    }

    private unstoreComicList(loc: string) {
        let localStorageName = ComicService.localStoragePrefix + loc;
        let dataStr = localStorage.getItem(localStorageName);
        if (!dataStr) return [];
        let data = JSON.parse(dataStr) as ComicListData[];
        return data.map(this.unpackComicListItem);
    }

    private loadComicType(name: string, storage: Array<Comic>) {
        const unloader = (comics: Comic[]) => {
            storage.length = 0;
            for (let comic of comics) {
                storage.push(comic);
            }
        };

        const cached = this.unstoreComicList(name);
        unloader(cached);
        this.http.get(apiURL + '/api/comics/' + name, {
            headers: this.auth.getAuthHeader()
        }) .toPromise()
            .then((data: Array<ComicListData>) => {
                unloader(data.map(this.unpackComicListItem));
                this.storeComicList(this.comics, 'comics');
            });
    }

    public loadMyComics() {
        this.loadComicType('myComics', this.myComics);
    }

    public loadComics() {
        this.loadComicType('comics', this.comics);
    }

    private unpackComic(entry: ComicData) {
        let chapters: Chapter[] = [];
        let volumes: Volume[] = [];
        let pages: Page[] = [];

        for (let chapter of entry.chapters) {
            let c: Chapter = new Chapter(
                chapter.chapterid,
                chapter.volumeid,
                chapter.chapternumber,
            );
            chapters.push(c);
        }

        for (let volume of entry.volumes) {
            let v: Volume = new Volume(
                volume.volumeid,
                volume.volumenumber,
            );
            volumes.push(v);
        }

        for (let page of entry.pages) {
            let p: Page = new Page(
                page.pageid,
                page.pagenumber,
                page.chapterid,
                page.imgurl,
                page.alttext
            );
            pages.push(p);
        }

        let comic = new Comic(
            entry.comicid,
            entry.accountid,
            entry.title,
            entry.comicurl,
            entry.description,
            entry.thumbnailurl,
            volumes,
            chapters,
            pages
        );

        return comic;
    }

    private packComic(comic: Comic): ComicData {
        return {
            comicid: comic.comicID,
            accountid: comic.accountID,
            title: comic.title,
            comicurl: comic.comicURL,
            description: comic.description,
            thumbnailurl: comic.thumbnailURL,
            volumes: comic.volumes.map(volume => {
                return {
                    volumeid: volume.volumeID,
                    volumenumber: volume.volumeNumber
                };
            }),
            chapters: comic.chapters.map(chapter => {
                return {
                    chapterid: chapter.chapterID,
                    volumeid: chapter.volumeID,
                    chapternumber: chapter.chapterNumber
                };
            }),
            pages: comic.pages.map(page => {
                return {
                    pageid: page.pageID,
                    pagenumber: page.pageNumber,
                    chapterid: page.chapterID,
                    imgurl: page.imgURL,
                    alttext: page.altText
                };
            })
        };
    }

    private cacheComic(comicURL: string, data: ComicData) {
        localStorage.setItem(ComicService.localStoragePrefix + 'comic-' + comicURL,
            JSON.stringify(data));
    }

    public getCachedComic(comicURL: string) {
        let dataStr = localStorage.getItem(ComicService.localStoragePrefix + 'comic-' + comicURL);
        if (!dataStr) return null;
        return this.unpackComic(JSON.parse(dataStr));
    }

    public getComic(comicURL: string): Promise<Comic> {
        return this.http.get(apiURL + '/api/comics/get/' + comicURL)
            .toPromise().then((data: ComicData) => {
                this.cacheComic(comicURL, data);
                this.comic = this.unpackComic(data);
                return this.comic;
            });
    }
}


interface ComicListData {
    comicid: number;
    accountid: number;
    title: string;
    comicurl: string;
    description: string;
    thumbnailurl: string;
}

interface ComicData {
    comicid: number;
    accountid: number;
    title: string;
    comicurl: string;
    description: string;
    thumbnailurl: string;

    pages: Array<{
        pageid: number
        pagenumber: number
        chapterid: number
        imgurl: string
        alttext: string
    }>;

    chapters: Array<{
        chapterid: number
        volumeid: number
        chapternumber: number
    }>;

    volumes: Array<{
        volumeid: number
        volumenumber: number
    }>;
}
