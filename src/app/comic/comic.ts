export class Volume {
    constructor(
        public volumeID: number,
        public volumeNumber: number,
    ) { }
}

export class Chapter {
    constructor(
        public chapterID: number,
        public volumeID: number,
        public chapterNumber: number,
    ) { }
}

export class Page {
    static empty = new Page(0, 0, 0, '', '');
    constructor(
        public pageID: number,
        public pageNumber: number,
        public chapterID: number,
        public imgURL: string,
        public altText: string,
    ) { }
}

export class Comic {
    static empty = new Comic(0, 0, '', '', '', '', '', { username: '', profileURL: '' }, [], [], []);
    private chapterMap: Map<number, Chapter>;
    private volumeMap: Map<number, Volume>;
    private highestChapter: number;
    private highestVolume: number;


    constructor(
        public comicID: number,
        public accountID: number,
        public title: string,
        public comicURL: string,
        public description: string,
        public tagline: string,
        public thumbnailURL: string,
        public owner: {
            username: string,
            profileURL: string
        },
        public volumes: Volume[] = [],
        public chapters: Chapter[] = [],
        public pages: Page[] = [],
    ) {
        this.chapterMap = new Map(this.chapters.map(chap => [chap.chapterID, chap] as [number, Chapter]));
        this.volumeMap = new Map(this.volumes.map(vol => [vol.volumeID, vol] as [number, Volume]));
        this.highestChapter = Math.max(...this.chapters.map(chapter => chapter.chapterID));
        this.highestVolume = Math.max(...this.volumes.map(volume => volume.volumeID));
        this.pages.sort((p1, p2) => this.pageSortValue(p1) - this.pageSortValue(p2));
    }

    public addVolume(volume: Volume) {
        this.volumes.push(volume);
        this.volumeMap.set(volume.volumeID, volume);
        this.highestVolume = Math.max(this.highestVolume, volume.volumeNumber);
    }

    public addChapter(chapter: Chapter) {
        this.chapters.push(chapter);
        this.chapterMap.set(chapter.chapterID, chapter);
        this.highestChapter = Math.max(this.highestVolume, chapter.chapterNumber);
    }

    private pageSortValue(page: Page) {
        let chapter = this.chapterMap.get(page.chapterID);
        let volume = chapter ? this.volumeMap.get(chapter.volumeID) : null;
        let chapterNumber = chapter ? chapter.chapterNumber : -1;
        let volumeNumber = volume ? volume.volumeNumber : -1;
        return page.pageNumber +
            chapterNumber * this.pages.length +
            volumeNumber * this.pages.length * this.chapters.length;
    }
}
