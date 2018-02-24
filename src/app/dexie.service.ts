import Dexie from 'dexie';

export class DexieService extends Dexie {
    constructor() {
        super('ComicLocalStorage');
        this.version(1).stores({
            comic: 'comicurl',
            comics: 'comicurl',
            myComics: 'comicurl',
            pagesRead: 'comicurl'
        });
    }
}
