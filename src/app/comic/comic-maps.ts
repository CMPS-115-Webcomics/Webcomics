import { Comic, Page, Chapter, Volume } from './comic';

// these maps store array indices and corresponding objects, they are gotten by their ID key
// i.e volumeMap.get(volumeID), volumeMap.set(volumeID, [arrayIndex, volume])
export class ComicMaps {
    private comic: Comic;
    private volumeMap: Map<number, [number, Volume]>;
    private chapterMap: Map<number, [number, Chapter]>;

    constructor(comic: Comic) { 
        this.comic = comic;
        this.volumeMap = new Map<number, [number, Volume]>();
        this.chapterMap = new Map<number, [number, Chapter]>();
        for (let i in comic.volumes) {
            let volume = comic.volumes[i];
            this.volumeMap.set(+volume.volumeID, [+i, volume]);
        }
        for (let i in comic.chapters) {
            let chapter = comic.chapters[i];
            this.chapterMap.set(+chapter.chapterID, [+i, chapter]);
        }
    }

    // functions utilizing on the maps
    getVolumeIndex(volumeID: number): number {
        if (this.volumeMap.get(volumeID))
            return this.volumeMap.get(volumeID)[0];
        return -1;
    }
    getChapterIndex(chapterID: number): number {
        if (this.chapterMap.get(chapterID))
            return this.chapterMap.get(chapterID)[0];
        return -1;
    }
    getVolume(volumeID: number): Volume {
        if (this.volumeMap.get(volumeID))
            return this.volumeMap.get(volumeID)[1];
        return null;
    }
    getChapter(chapterID: number): Chapter {
        if (this.chapterMap.get(chapterID))
            return this.chapterMap.get(chapterID)[1];
        return null;
    }
    getComic(): Comic {
        return this.comic;
    }
}
