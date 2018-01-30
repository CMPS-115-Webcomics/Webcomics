import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comic, Page, Chapter, Volume } from './comic';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { apiURL } from '../url';

@Injectable()
export class ComicService {
    public comics: Comic[] = [];
    public comic: Comic;

    constructor(private http: HttpClient) { }

    getComics(): Comic[] {
        this.http.get(apiURL + '/api/comics/list').subscribe(data => {
            for (let i in data) {
                let entry = data[i];
                let comic: Comic = new Comic(
                    entry.comicid,
                    entry.accountid,
                    entry.title,
                    entry.comicurl,
                    entry.description,
                    entry.thumbnailurl,
                );
                this.comics.push(comic);
            }
        });
        return this.comics;
    }

    getComic(comicURL: string): Observable<Comic> {
        return this.http.get(apiURL + '/api/comics/get/' + comicURL).map(data => {
            let entry = data;

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
