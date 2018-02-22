import Dexie from 'dexie';

export class DexieService extends Dexie {
    constructor() {
        super('1ComicLocalStorage');
        this.version(1).stores({
            comics: 'comicurl',
            myComics: 'comicurl',
            pagesRead: 'comicurl'
        });
    }
}
