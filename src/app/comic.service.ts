import { Injectable } from '@angular/core';
import { Comic, Page } from './comic';
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
            description: "a cool comic",
            pages: [
                {
                    pageID: 1,
                    pageNumber: 1,
                    chapterNumber: 1,
                    volumeNumber: 1,
                    imgURL: "https://imgix.ranker.com/user_node_img/50067/1001333402/original/living-worth-photo-u1?w=650&q=50&fm=jpg&fit=crop&crop=faces",
                    altText: "funny"
                }
            ]
        },
        {
            comicID: 2,
            accountID: 1,
            title: "cooler",
            comicURL: "coolio",
            description: "a cooler comic",
            pages: [
                {
                    pageID: 1,
                    pageNumber: 1,
                    chapterNumber: 1,
                    volumeNumber: 0,
                    imgURL: "https://ksr-ugc.imgix.net/assets/017/376/458/c788b026b1c126d7a94055851b2683e7_original.jpg?w=680&fit=max&v=1499216110&auto=format&q=92&s=13a663280cfe9f300eaf1b34938fa436",
                    altText: "finny"
                },
                {
                    pageID: 2,
                    pageNumber: 2,
                    chapterNumber: 1,
                    volumeNumber: 0,
                    imgURL: "http://files.explosm.net/comics/Rob/comics.png",
                    altText: "finnish"
                },
            ]
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
