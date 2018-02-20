import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { DexieService } from '../dexie.service';
import { Comic, Page, Chapter, Volume } from './comic';

@Injectable()
export class ComicStoreService {
    comicTable: Dexie.Table<ComicData, string>;
    myComicTable: Dexie.Table<ComicListData, string>;
    comicListTable: Dexie.Table<ComicListData, string>;

    constructor(
        private dexieService: DexieService,
    ) {
        var db = new Dexie("FriendsAndPetsDatabase");
        db.version(1).stores({
            users: "++id, name",
        });
        db.open().catch(function (e) {
            console.error("Open failed: " + e.stack);
        })

        db.transaction('rw', db.table('users'), function () {

            db.table('users').add({
                name: "Zlatan",
            });
            console.log(db.table('users').toArray());


        }).catch (function (e) {
            console.error(e.stack);
        });
        this.comicTable = this.dexieService.table('comics');
        this.myComicTable = this.dexieService.table('myComics');
        this.comicListTable = this.dexieService.table('comicList');
        this.comicListTable.add({comicurl: 'url'});
        //this.dexieService.table('comicList').toArray().then((r) => console.log(r)).catch((e) => console.log(e));
        //console.log(this.comicListTable.toArray());
        //console.log(this.comicTable, this.myComicTable);
        //let comicTable: Dexie.Table<ComicData, string> = this.dexieService.table('comics');
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
        /*
            entry.comicid,
            entry.accountid,
            entry.title,
            entry.comicurl,
            entry.description,
            entry.thumbnailurl,
        */
            1,1,"title",entry.comicurl,"desc","123.com"
        );
    }

    packComicListItem(comic: Comic): ComicListData {
        return {
            /*
            comicid: comic.comicID,
            accountid: comic.accountID,
            title: comic.title,
            comicurl: comic.comicURL,
            description: comic.description,
            thumbnailurl: comic.thumbnailURL
*/
            comicurl: comic.comicURL,
        };
    }

    storeComicList(comics: Comic[], loc: string) {
    //let localStorageName = ComicService.localStoragePrefix + loc;
        console.log('storing comics in ' + loc);
        //let comicListTable: Dexie.Table<ComicListData, string> = this.dexieService.table(loc);
            if (loc === 'myComics') {
                this.myComicTable.bulkPut(comics.map(this.packComicListItem));
            } else if (loc === 'comics' || loc === 'comicList') {
                this.comicListTable.bulkPut(comics.map(this.packComicListItem));
            } else {
                console.log("error? " + loc);
            }
        /*
        localStorage.setItem(localStorageName,
            JSON.stringify(comics.map(this.packComicListItem)));
*/
    }

    unstoreComicList(loc: string) {
            console.log('unstoring comic list ' + loc);
            let ac = new Comic(1,1,"title","url","description","123.com",[],[],[]);
            this.storeComicList([ac], 'comicList');
            //if (!(await this.dexieService.exists(loc))) return [];
            //let comicListTable: Dexie.Table<ComicListData, string> = this.dexieService.table(loc);
            this.comicListTable.add(this.packComicListItem(ac));
            //console.log(this.comicListTable);
            //console.log(this.dexieService);
            //console.log(this.comicListTable.get('url'));
            //console.log(this.comicListTable.toArray());
            return new Promise((resolve) => {
                this.comicListTable.toArray().then(function (data: ComicListData[]) {
                    console.log('data' + data);
                    let res = data.map(this.unpackComicListItem);
                    console.log('res' + res);
                    return res;
                    //resolve(res);
                });
            });
            /*
            return this.comicListTable.toArray().then(function (data) {
                console.log('data' + data);
                let res = data.map(this.unpackComicListItem);
                console.log('res' + res);
                return res;
            });
*/
        //if (!result) return [];
            //let data = JSON.parse(result) as ComicListData[];
            //return data.map(this.unpackComicListItem);
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

        /*
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
*/

        let comic = new Comic(
            /*
            entry.comicid,
            entry.accountid,
            entry.title,
            entry.comicurl,
            entry.description,
            entry.thumbnailurl,
*/
            1,1,"title",entry.comicurl,"desc","123.com",
            volumes,
            chapters,
            pages
        );

        return comic;
    }

    packComic(comic: Comic): ComicData {
        return {
        comicurl: comic.comicURL
        /*
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
*/
        };
    }

    cacheComic(data: ComicData) {
    /*
        localStorage.setItem(ComicService.localStoragePrefix + 'comic-' + comicURL,
            JSON.stringify(data));
    */
        //let comicTable: Dexie.Table<ComicData, string> = this.dexieService.table('comics');
        this.comicTable.put(data);
    }

    public async getCachedComic(comicURL: string) {
        //let dataStr = localStorage.getItem(ComicService.localStoragePrefix + 'comic-' + comicURL);
        //let comicTable: Dexie.Table<ComicData, string> = this.dexieService.table('comics');
        //let data = await comicTable.get({ 'comicurl': comicURL });
        let data = await this.comicTable.get({ comicurl: comicURL });
        return this.unpackComic(data);
        //if (!dataStr) return null;
        //return this.unpackComic(JSON.parse(dataStr));
    }
}

export interface ComicListData {
    comicurl: string;
    /*
    comicid: number;
    accountid: number;
    title: string;
    description: string;
    thumbnailurl: string;
    */
}

export interface ComicData {
    comicurl: string;
    /*
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

    volumes: Array<{
        volumeid: number
        volumenumber: number
    }>;
    */
}
