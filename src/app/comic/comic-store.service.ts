import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Dexie from 'dexie';
import { DexieService } from '../dexie.service';
import { Comic, Page, Chapter, Volume } from './comic';

@Injectable()
export class ComicStoreService {

    constructor(
        private dexieService: DexieService,
        private http: HttpClient
    ) {
    }

    /*
    public cacheComic(comic: Comic) {
    }
*/

/*
    public getReadComics() {
        let comic = new Comic(4, 1, "a", "123", "hello", "123.com", [], [], []);
        this.cacheComic(comic);
        return this.comicTable.toArray();
    }
*/

    /*
    public getReadComicIDs() {
        let readComicIDs = [];
        let get = async function() {
            let result = await this.getReadComics();
            for (let comic in result) {
                readComicIDs.push(comic.comicID);
            }
        };

        get();
        return readComicIDs;
    }
    */

    /*
    public addPageRead(comicID: number, pageID: number) {
    }
    */
    unpackComicListItem(entry: ComicListData) {
        return new Comic(
            entry.comicid,
            entry.accountid,
            entry.title,
            entry.comicurl,
            entry.description,
            entry.thumbnailurl,
        );
    }

    packComicListItem(comic: Comic): ComicListData {
        return {
            comicid: comic.comicID,
            accountid: comic.accountID,
            title: comic.title,
            comicurl: comic.comicURL,
            description: comic.description,
            thumbnailurl: comic.thumbnailURL
        };
    }

    storeComicList(comics: Comic[], loc: string) {
    //let localStorageName = ComicService.localStoragePrefix + loc;
        let comicListTable = this.dexieService.table(loc);
        comicListTable.put(comics.map(this.packComicListItem));
        /*
        localStorage.setItem(localStorageName,
            JSON.stringify(comics.map(this.packComicListItem)));
*/
    }

    unstoreComicList(loc: string) {
        console.log(loc);
        let comicListTable = this.dexieService.table(loc);
        return comicListTable.toArray().then(function (result) {
            console.log(result);
            return result.map(this.unpackComicListsItem);
        //if (!result) return [];
            //let data = JSON.parse(result) as ComicListData[];
            //return data.map(this.unpackComicListItem);
        });
    /*
        let localStorageName = ComicService.localStoragePrefix + loc;
        let dataStr = localStorage.getItem(localStorageName);
        if (!dataStr) return [];
        let data = JSON.parse(dataStr) as ComicListData[];
        return data.map(this.unpackComicListItem);
*/
    }


    unpackComic(entry: ComicData) {
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

    packComic(comic: Comic): ComicData {
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

    cacheComic(comicURL: string, data: ComicData) {
    /*
        localStorage.setItem(ComicService.localStoragePrefix + 'comic-' + comicURL,
            JSON.stringify(data));
    */
        let comicTable = this.dexieService.table('comic');
        comicTable.put(data);
    }

    public getCachedComic(comicURL: string) {
        //let dataStr = localStorage.getItem(ComicService.localStoragePrefix + 'comic-' + comicURL);
        let comicTable = this.dexieService.table('comic');
        return comicTable.get({ 'comicURL': comicURL }).then(function (result) {
            return this.unpackComic(result);
        });
        //if (!dataStr) return null;
        //return this.unpackComic(JSON.parse(dataStr));
    }
}

export interface ComicListData {
    comicid: number;
    accountid: number;
    title: string;
    comicurl: string;
    description: string;
    thumbnailurl: string;
}

export interface ComicData {
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
