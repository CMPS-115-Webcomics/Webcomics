import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { DexieService } from '../dexie.service';
import { Comic, Page, Chapter, Volume } from './comic';

export interface ComicListData {
    comicurl: string;
};

export interface ComicData {
    comicurl: string;
};

@Injectable()
export class ComicStoreService {

    constructor(
        private dexieService: DexieService,
    ) { }

    unpackComicListItem(entry: ComicListData) {
        return new Comic(
            1,1,"title",entry.comicurl,"desc","123.com"
        );
    }

    packComicListItem(comic: Comic): ComicListData {
        return {
            comicurl: comic.comicURL,
        };
    }

    storeComicList(comics: Comic[], loc: string) {
        console.log('storing comics in ' + loc);
        let comicListTable: Dexie.Table<ComicListData, string> = this.dexieService.table(loc);
        comicListTable.bulkPut(comics.map(this.packComicListItem));
    }

    unstoreComicList(loc: string) {
            let comicListTable: Dexie.Table<ComicListData, string> = this.dexieService.table('comicList');
            return comicListTable.toArray();
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
        comicurl: comic.comicURL
        };
    }

    cacheComic(data: ComicData) {
        let comicTable: Dexie.Table<ComicData, string> = this.dexieService.table('comics');
        comicTable.put(data);
    }

    public async getCachedComic(comicURL: string) {
        //let dataStr = localStorage.getItem(ComicService.localStoragePrefix + 'comic-' + comicURL);
        let comicTable: Dexie.Table<ComicData, string> = this.dexieService.table('comics');
        //let data = await comicTable.get({ 'comicurl': comicURL });
        let data = await comicTable.get({ comicurl: comicURL });
        return this.unpackComic(data);
        //if (!dataStr) return null;
        //return this.unpackComic(JSON.parse(dataStr));
    }
}
