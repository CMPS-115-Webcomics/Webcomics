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
    static empty = new Comic(0, 0, '', '', '', '', [], [], []);
    constructor(
        public comicID: number,
        public accountID: number,
        public title: string,
        public comicURL: string,
        public description: string,
        public thumbnailURL: string,
        public volumes: Volume[] = [],
        public chapters: Chapter[] = [],
        public pages: Page[] = [],
    ) { }

    addChapter(volume?: Volume) {
        let parent = volume || this.volumes[this.volumes.length - 1];
        let volId = parent ? parent.volumeID : null;
        let newChapter = new Chapter(
            Math.floor(Math.random() * 1000 + 1),
            volId,
            Math.max(...this.chapters
                .filter(chapter => chapter.volumeID === volId)
                .map(chapter => chapter.chapterNumber)
                 .concat(0)) + 1
        );
        // chapterId needs to be loaded from server
        this.chapters.push(newChapter);
        return newChapter;
    }

    addVolume() {
        let volNum = Math.max(1, Math.max(...this.volumes.map(volume => volume.volumeNumber)) + 1);
        let newVolume = new Volume(
            Math.floor(Math.random() * 1000 + 1),
            volNum
        );
        this.volumes.push(newVolume);
        this.addChapter(newVolume);
        return newVolume;
    }
}
