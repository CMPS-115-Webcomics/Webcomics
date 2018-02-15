import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { DexieService } from '../dexie.service';
import { Comic, Page } from './comic';

@Injectable()
export class ComicStoreService {
    comicTable: Dexie.Table<Comic, number>

    constructor(private dexieService: DexieService) {
        this.comicTable = this.dexieService.table('comicsRead');
    }

    public addComicRead(comic: Comic) {
        this.comicTable.put(comic);
    }

    public getReadComics() {
        let comic = new Comic(4, 1, "a", "123", "hello", "123.com", [], [], []);
        this.addComicRead(comic);
        return this.comicTable.toArray();
    }

    public getReadComicIDs() {
        let readComicIDs = [];
        let hello;
        let get = async function() {
            let result = await this.getReadComics();
            hello = result;
            /*
            for (let comic in result) {
                readComicIDs.push(comic.comicID);
            }
            */
        };

        get();
        console.log(hello);
        return readComicIDs;
    }

    /*
    public addPageRead(comicID: number, pageID: number) {
    }
    */
}
