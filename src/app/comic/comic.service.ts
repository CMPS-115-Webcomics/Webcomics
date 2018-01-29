import { Injectable } from '@angular/core';
import { Comic, Page, Volume } from './comic';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
@Injectable()
export class ComicService {
    private COMICS: Comic[] =
        [
            new Comic(
                1,
                1,
                'cool',
                'cool',
                'a cool comic',
                'https://img00.deviantart.net/3cc2/i/2014/175/d/7/cool_neon_render_by_pauljs75-d7nrr6p.png',
                [
                    new Volume(1, 1),
                    new Volume(2, 2),
                    new Volume(3, 3)
                ],
                [
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
                [
                    {
                        pageID: 1,
                        pageNumber: 1,
                        chapterID: 1,
                        imgURL: 'https://imgix.ranker.com/user_node_img/50067/1001333402/original/living-worth-photo-u1?w=650&q=50&fm=jpg&fit=crop&crop=faces',
                        altText: 'funny'
                    },
                    {
                        pageID: 3,
                        pageNumber: 1,
                        chapterID: 2,
                        imgURL: 'https://ksr-ugc.imgix.net/assets/017/376/458/c788b026b1c126d7a94055851b2683e7_original.jpg?w=680&fit=max&v=1499216110&auto=format&q=92&s=13a663280cfe9f300eaf1b34938fa436',
                        altText: 'finny'
                    },
                    {
                        pageID: 4,
                        pageNumber: 2,
                        chapterID: 2,
                        imgURL: 'http://files.explosm.net/comics/Rob/comics.png',
                        altText: 'finnish'
                    },
                    {
                        pageID: 5,
                        pageNumber: 1,
                        chapterID: 3,
                        imgURL: 'http://static.existentialcomics.com/comics/captainMetaphysicsPostmodern1.png',
                        altText: 'funi'
                    },
                    {
                        pageID: 6,
                        pageNumber: 2,
                        chapterID: 3,
                        imgURL: 'https://d1ejxu6vysztl5.cloudfront.net/comics/garfield/2016/2016-04-27.gif',
                        altText: 'funi'
                    },
                    {
                        pageID: 7,
                        pageNumber: 1,
                        chapterID: 4,
                        imgURL: 'https://imgs.xkcd.com/comics/sticks_and_stones_2x.png',
                        altText: 'xkcd'
                    },
                    {
                        pageID: 8,
                        pageNumber: 1,
                        chapterID: 5,
                        imgURL: 'https://imgs.xkcd.com/comics/cells_2x.png',
                        altText: 'xkcd'
                    },
                    {
                        pageID: 9,
                        pageNumber: 1,
                        chapterID: 6,
                        imgURL: 'https://images-na.ssl-images-amazon.com/images/S/cmx-images-prod/Item/503415/Previews/d08eb79336678d2b9c98286b1db6f13b._SX1280_QL80_TTD_.jpg',
                        altText: 'funi'
                    },
                    {
                        pageID: 10,
                        pageNumber: 2,
                        chapterID: 6,
                        imgURL: 'https://www.idwpublishing.com/wp-content/uploads/2016/05/SpiderMan3_PR.jpg',
                        altText: 'funi'
                    },
                    {
                        pageID: 11,
                        pageNumber: 3,
                        chapterID: 6,
                        imgURL: 'https://fsmedia.imgix.net/da/33/64/a7/3020/4104/b04e/6c8870fb2dd2/from-the-amazing-spider-man-33.jpeg',
                        altText: 'funi'
                    },
                ]),
            new Comic(
                2,
                1,
                'no-sounds',
                'screaming-in-space',
                'a volumeless comic',
                'https://newcdn.transom.org/wp-content/uploads/2017/09/SoundDesignFEATURED.jpg',
                [],
                [
                    {
                        volumeID: 0,
                        chapterID: 50,
                        chapterNumber: 1
                    },
                    {

                        volumeID: 0,
                        chapterID: 51,
                        chapterNumber: 2
                    },
                ],
                [
                    {
                        pageID: 5000,
                        pageNumber: 1,
                        chapterID: 50,
                        imgURL: 'https://d1ejxu6vysztl5.cloudfront.net/comics/garfield/2018/2018-01-25.gif',
                        altText: 'kevin spacey'
                    },
                    {
                        pageID: 5001,
                        pageNumber: 2,
                        chapterID: 50,
                        imgURL: 'https://d1ejxu6vysztl5.cloudfront.net/comics/garfield/1980/1980-10-04.gif',
                        altText: 'kevin spacey'
                    },
                    {
                        pageID: 5002,
                        pageNumber: 3,
                        chapterID: 50,
                        imgURL: 'https://d1ejxu6vysztl5.cloudfront.net/comics/garfield/1987/1987-06-04.gif',
                        altText: 'kevin spacey'
                    },
                    {
                        pageID: 5003,
                        pageNumber: 4,
                        chapterID: 50,
                        imgURL: 'https://d1ejxu6vysztl5.cloudfront.net/comics/garfield/1992/1992-06-28.gif',
                        altText: 'kevin spacey'
                    },
                    {
                        pageID: 5004,
                        pageNumber: 5,
                        chapterID: 50,
                        imgURL: 'https://d1ejxu6vysztl5.cloudfront.net/comics/garfield/2004/2004-01-20.gif',
                        altText: 'kevin spacey'
                    },
                    {
                        pageID: 5005,
                        pageNumber: 6,
                        chapterID: 50,
                        imgURL: 'https://d1ejxu6vysztl5.cloudfront.net/comics/garfield/1990/1990-11-26.gif',
                        altText: 'kevin spacey'
                    },
                    {
                        pageID: 5006,
                        pageNumber: 1,
                        chapterID: 51,
                        imgURL: 'https://d1ejxu6vysztl5.cloudfront.net/comics/usacres/1986/usa1986-04-13.gif',
                        altText: 'kevin spacey'
                    },
                ]
            ),
            new Comic(
                3,
                2,
                'not cool',
                'lame',
                'one page comic',
                'https://orig00.deviantart.net/5283/f/2007/067/0/a/lame_expression_productions_by_dhedarkhcustard.png',
                [],
                [],
                [
                    {
                        pageID: 999999,
                        pageNumber: 1,
                        chapterID: 0,
                        imgURL: 'http://i0.kym-cdn.com/photos/images/facebook/001/016/682/379.jpeg',
                        altText: 'it\'s me'
                    }
                ],
            )
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
