import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { DexieService } from '../dexie.service';
import { Comic, Page, Chapter, Volume } from './comic';

export interface ComicListData {
    comicurl: string;
    comicid: number;
    accountid: number;
    title: string;
    description: string;
    thumbnailurl: string;
};

export interface ComicData {
    comicurl: string;
    comicid: number;
    accountid: number;
    title: string;
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

    volumes: Array<{ volumeid: number
        volumenumber: number
    }>;
};

@Injectable()
export class ComicStoreService {

    constructor(
        private dexieService: DexieService,
    ) { }

    unpackComicListItem(entry: ComicListData) {
        return new Comic(
            entry.comicid,
            entry.accountid,
            entry.title,
            entry.comicurl,
            entry.description,
            entry.thumbnailurl
        );
    }

    packComicListItem(comic: Comic): ComicListData {
        return {
            comicurl: comic.comicURL,
            comicid: comic.comicID,
            accountid: comic.accountID,
            title: comic.title,
            description: comic.description,
            thumbnailurl: comic.thumbnailURL
        };
    }

    storeComicList(comics: Comic[], loc: string) {
        console.log('storing comics in ' + loc);
        let comicListTable: Dexie.Table<ComicListData, string> = this.dexieService.table(loc);
        comicListTable.bulkPut(comics.map(this.packComicListItem));
    }

    unstoreComicList(loc: string) {
        let ac = new Comic(1,1,"title","url","description","123.com",[],[],[]);
        this.storeComicList([ac], 'comicList');


        let comicListTable: Dexie.Table<ComicListData, string> = this.dexieService.table('comicList');
        return new Promise((resolve, reject) => {
            comicListTable.toArray().then((data: ComicListData[]) => {
                resolve(data.map(this.unpackComicListItem));
            }).catch((e) => {
                console.error(e);
                reject([]);
            });
        });
    }


    unpackComic(entry: ComicData) {
        let chapters: Chapter[] = [];
        let volumes: Volume[] = [];
        let pages: Page[] = [];

        let comic = new Comic(
            1,1,"title",entry.comicurl,"desc","123.com",
            volumes,
            chapters,
            pages
        );

        return comic;
    }

    packComic(comic: Comic): ComicData {
        return {
            comicurl: comic.comicURL,
            comicid: comic.comicID,
            accountid: comic.accountID,
            title: comic.title,
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

    cacheComic(data: ComicData) {
        let comicTable: Dexie.Table<ComicData, string> = this.dexieService.table('comics');
        comicTable.put(data);
    }

    public async getCachedComic(comicURL: string) {
        let comicTable: Dexie.Table<ComicData, string> = this.dexieService.table('comics');
        let data = await comicTable.get({ comicurl: comicURL });
        return this.unpackComic(data);
    }
}
