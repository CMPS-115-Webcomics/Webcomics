export class Volume {
    volumeID: number;
    volumeNumber: number;
}

export class Chapter {
    chapterID: number;
    volumeID: number;
    chapterNumber: number;
}

export class Page {
    pageID: number;
    pageNumber: number;
    chapterID: number;
    imgURL: string;
    altText: string;
}

export class Comic {
    comicID: number;
    accountID: number;
    title: string;
    comicURL: string;
    thumbnailURL: string;
    description: string;
    volumes: Volume[];
    chapters: Chapter[];
    pages: Page[];
}
