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
    ) { }
}
