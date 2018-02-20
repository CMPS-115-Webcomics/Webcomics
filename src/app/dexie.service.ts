import Dexie from 'dexie';

export class DexieService extends Dexie {
    constructor() {
        super('Ng2DexieComicStore');
        this.version(1).stores({
            comicList: 'comicurl',
            /*
            myComics: 'comicurl',
            comics: 'comicurl',
            comic: 'comicurl',
*/
        });
        //this.comicList.toArray().then((r) => console.log("cl" + r)).catch((e) => console.log("cl" + e));
        //this.table('comicList').toArray().then((r) => console.log("clllll" + r)).catch((e) => console.log(":(" + e));
    }
}
