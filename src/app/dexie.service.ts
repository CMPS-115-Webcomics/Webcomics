import Dexie from 'dexie';

export class DexieService extends Dexie {
    constructor() {
        super('LocalComicStore');
        this.version(1).stores({
            comicList: 'comicurl',
        });
    }
}
