export class Page {
    pageID: number;
    pageNumber: number;
    chapterNumber: number;
    volumeNumber: number;
    imgURL: string;
    altText: string;
}

export class Comic {
    comicID: number;
    accountID: number;
    title: string;
    comicURL: string;
    description: string;
    pages: Page[];
}
