import Dexie from 'dexie';

export class DexieService extends Dexie {

    constructor() {
        super('Ng2DexieComicStore');
        this.version(1).stores({
            comicList: 'comicurl',
            myComics: 'comicurl',
            comics: 'comicurl',
            comic: 'comicurl',
        });
    }

}
