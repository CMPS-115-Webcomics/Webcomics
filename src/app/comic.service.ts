import { Injectable } from '@angular/core';
import { Comic } from './comic';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ComicService {
    private COMICS: Comic[] = [
        {
            comicID: 1,
            accountID: 1,
            title: "cool",
            comicURL: "cool",
            description: "a cool comic"
        },
        {
            comicID: 2,
            accountID: 1,
            title: "cooler",
            comicURL: "coolio",
            description: "a cooler comic"
        }
    ];

    getComics(): Comic[] {
        return this.COMICS;
    }

    getComic(comicURL: string): Observable<Comic> {
        let comics = this.getComics();
        for (let c of comics) {
            if (c.comicURL == comicURL) return of(c);
        }

        let comic: Comic;
        return of(comic);
    }

    constructor() { }

}
