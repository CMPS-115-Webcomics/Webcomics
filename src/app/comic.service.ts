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
            volumes: [],
            chapters: [
                {
                    chapterID: 1,
                    volumeID: 0,
                    chapterNumber: 1,
                },
                {
                    chapterID: 2,
                    volumeID: 0,
                    chapterNumber: 2,
                },
                {
                    chapterID: 3,
                    volumeID: 0,
                    chapterNumber: 3,
                }
            ],
            pages: [
                {
                    pageID: 1,
                    pageNumber: 1,
                    chapterID: 1,
                    imgURL: "https://imgix.ranker.com/user_node_img/50067/1001333402/original/living-worth-photo-u1?w=650&q=50&fm=jpg&fit=crop&crop=faces",
                    altText: "funny"
                },
                {
                    pageID: 3,
                    pageNumber: 1,
                    chapterID: 2,
                    imgURL: "https://ksr-ugc.imgix.net/assets/017/376/458/c788b026b1c126d7a94055851b2683e7_original.jpg?w=680&fit=max&v=1499216110&auto=format&q=92&s=13a663280cfe9f300eaf1b34938fa436",
                    altText: "finny"
                },
                {
                    pageID: 4,
                    pageNumber: 2,
                    chapterID: 2,
                    imgURL: "http://files.explosm.net/comics/Rob/comics.png",
                    altText: "finnish"
                },
                {
                    pageID: 5,
                    pageNumber: 1,
                    chapterID: 3,
                    imgURL: "http://static.existentialcomics.com/comics/captainMetaphysicsPostmodern1.png",
                    altText: "funi"
                }
            ]
        },
        /*
        {
            comicID: 2,
            accountID: 1,
            title: "cooler",
            comicURL: "coolio",
            description: "a cooler comic",
            pages: [
kkkkkkkkkkkkkkkk
            ]
        }
        */
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
