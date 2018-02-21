import Dexie from 'dexie';

export class DexieService extends Dexie {
    constructor() {
        super('ComicLocalStorage');
        this.version(1).stores({
            comics: 'comicurl',
            myComics: 'comicurl',
        });
    }
}
