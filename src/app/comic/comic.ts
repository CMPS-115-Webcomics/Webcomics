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
    constructor(
        public pageID: number,
        public pageNumber: number,
        public chapterID: number,
        public imgURL: string,
        public altText: string,
    ) { }
}

export class Comic {
    constructor(
        public comicID: number,
        public accountID: number,
        public title: string,
        public comicURL: string,
        public description: string,
        public thumbnailURL: string,
        public volumes: Volume[],
        public chapters: Chapter[],
        public pages: Page[],
    ) { }

    addChapter(volume?: Volume) {
        let parent = volume || this.volumes[this.volumes.length - 1];
        let volId = parent ? parent.volumeID : 0;
        let newChapter = new Chapter(
            Math.random(),
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
        let newVolume = new Volume(
            Math.random(),
            Math.max(...this.volumes.map(volume => volume.volumeNumber)) + 1
        );
        this.volumes.push(newVolume);
        this.addChapter(newVolume);
        return newVolume;
    }
}
