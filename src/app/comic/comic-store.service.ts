import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { DexieService } from '../dexie.service';
import { Comic, Page } from './comic';

@Injectable()
export class ComicStoreService {
    table: Dexie.Table<Comic, number>

    constructor(private dexieService: DexieService) {
        this.table = this.dexieService.table('comics');
    }

    public pageRead(comicID: number, pageID: number) {

    }
}
