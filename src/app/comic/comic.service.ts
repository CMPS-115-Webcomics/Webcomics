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
            volumes: [
                {
                    volumeID: 1,
                    volumeNumber: 1
                },
                {
                    volumeID: 2,
                    volumeNumber: 2
                },
                {
                    volumeID: 3,
                    volumeNumber: 3
                }
            ],
            chapters: [
                {
                    chapterID: 1,
                    volumeID: 1,
                    chapterNumber: 1,
                },
                {
                    chapterID: 2,
                    volumeID: 1,
                    chapterNumber: 2,
                },
                {
                    chapterID: 3,
                    volumeID: 1,
                    chapterNumber: 3,
                },
                {
                    chapterID: 4,
                    volumeID: 2,
                    chapterNumber: 1,
                },
                {
                    chapterID: 5,
                    volumeID: 2,
                    chapterNumber: 2
                },
                {
                    chapterID: 6,
                    volumeID: 3,
                    chapterNumber: 1
                },
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
                },
                {
                    pageID: 6,
                    pageNumber: 2,
                    chapterID: 3,
                    imgURL: "https://d1ejxu6vysztl5.cloudfront.net/comics/garfield/2016/2016-04-27.gif",
                    altText: "funi"
                },
                {
                    pageID: 7,
                    pageNumber: 1,
                    chapterID: 4,
                    imgURL: "https://imgs.xkcd.com/comics/sticks_and_stones_2x.png",
                    altText: "xkcd"
                },
                {
                    pageID: 8,
                    pageNumber: 1,
                    chapterID: 5,
                    imgURL: "https://imgs.xkcd.com/comics/cells_2x.png",
                    altText: "xkcd"
                },
                {
                    pageID: 9,
                    pageNumber: 1,
                    chapterID: 6,
                    imgURL: "https://images-na.ssl-images-amazon.com/images/S/cmx-images-prod/Item/503415/Previews/d08eb79336678d2b9c98286b1db6f13b._SX1280_QL80_TTD_.jpg",
                    altText: "funi"
                },
                {
                    pageID: 10,
                    pageNumber: 2,
                    chapterID: 6,
                    imgURL: "https://www.idwpublishing.com/wp-content/uploads/2016/05/SpiderMan3_PR.jpg",
                    altText: "funi"
                },
                {
                    pageID: 11,
                    pageNumber: 3,
                    chapterID: 6,
                    imgURL: "https://fsmedia.imgix.net/da/33/64/a7/3020/4104/b04e/6c8870fb2dd2/from-the-amazing-spider-man-33.jpeg",
                    altText: "funi"
                },
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
