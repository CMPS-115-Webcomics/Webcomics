import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { DexieService } from '../dexie.service';
import { Comic, Page, Chapter, Volume, OrganizationType } from './comic';

export interface ComicListData {
    comicurl: string;
    comicid: number;
    accountid: number;
    title: string;
    description: string;
    tagline: string;
    thumbnailurl: string;
}

export interface PagesReadData {
    comicurl: string;
    pagesRead: Array<number>;
}

export interface ComicData {
    comicurl: string;
    comicid: number;
    accountid: number;
    title: string;
    description: string;
    thumbnailurl: string;
    tagline: string;
    organization: string;

    owner: {
        username: string;
        profileurl: string;
    };

    pages: Array<{
        pageid: number
        pagenumber: number
        chapterid: number
        imgurl: string
        alttext: string
    }>;

    chapters: Array<{
        chapterid: number
        volumeid: number
        chapternumber: number
    }>;

    volumes: Array<{
        volumeid: number
        volumenumber: number
    }>;
}

@Injectable()
export class ComicStoreService {

    constructor(
        private dexieService: DexieService,
    ) { }

    unpackComicListItem(entry: ComicListData) {
        return new Comic(
            entry.comicid,
            entry.accountid,
            entry.title,
            entry.comicurl,
            entry.description,
            entry.tagline,
            entry.thumbnailurl,
            null,
            null
        );
    }

    packPagesRead(comicURL: string, pagesRead: Set<number>): PagesReadData {
        return {
            comicurl: comicURL,
            pagesRead: Array.from(pagesRead.values())
        };
    }

    unpackPagesRead(entry: PagesReadData): number[] {
        let pagesRead = entry.pagesRead;
        return entry.pagesRead;
    }

    unpackComic(entry: ComicData) {
        let chapters: Chapter[] = [];
        let volumes: Volume[] = [];
        let pages: Page[] = [];
        for (let chapter of entry.chapters) {
            let c: Chapter = new Chapter(
                chapter.chapterid,
                chapter.volumeid,
                chapter.chapternumber,
            );
            chapters.push(c);
        }

        for (let volume of entry.volumes) {
            let v: Volume = new Volume(
                volume.volumeid,
                volume.volumenumber,
            );
            volumes.push(v);
        }

        for (let page of entry.pages) {
            let p: Page = new Page(
                page.pageid,
                page.pagenumber,
                page.chapterid,
                page.imgurl,
                page.alttext
            );
            pages.push(p);
        }

        let comic = new Comic(
            entry.comicid,
            entry.accountid,
            entry.title,
            entry.comicurl,
            entry.description,
            entry.tagline,
            entry.thumbnailurl,
            entry.organization,
            {username: entry.owner.username, profileURL: entry.owner.profileurl},
            volumes,
            chapters,
            pages
        );

        return comic;
    }

    packComic(comic: Comic): ComicData {
        return {
            comicurl: comic.comicURL,
            comicid: comic.comicID,
            accountid: comic.accountID,
            tagline: comic.tagline,
            title: comic.title,
            description: comic.description,
            thumbnailurl: comic.thumbnailURL,
            organization: OrganizationType[comic.getOrganization()],
            owner: {
                username: comic.owner.username,
                profileurl: comic.owner.profileURL
            },
            volumes: comic.volumes.map(volume => {
                return {
                    volumeid: volume.volumeID,
                    volumenumber: volume.volumeNumber
                };
            }),
            chapters: comic.chapters.map(chapter => {
                return {
                    chapterid: chapter.chapterID,
                    volumeid: chapter.volumeID,
                    chapternumber: chapter.chapterNumber
                };
            }),
            pages: comic.pages.map(page => {
                return {
                    pageid: page.pageID,
                    pagenumber: page.pageNumber,
                    chapterid: page.chapterID,
                    imgurl: page.imgURL,
                    alttext: page.altText
                };
            })
        };
    }

    cacheComicList(data: ComicListData[], loc: string) {
        const comicListTable: Dexie.Table<ComicListData, string> = this.dexieService.table(loc);
        comicListTable.bulkPut(data);
        const validIds = new Set(data.map(comic => comic.comicid));
        this.getCachedComicList(loc).then(comics => {
            const toDelete = comics
                .filter(comic => !validIds.has(comic.comicID))
                .map(comic => comic.comicURL);
            comicListTable.bulkDelete(toDelete);
        });
    }

    getCachedComicList(loc: string) {
        let comicListTable: Dexie.Table<ComicListData, string> = this.dexieService.table(loc);
        return comicListTable.toArray().then((data: ComicListData[]) => {
            return data.map(this.unpackComicListItem);
        }).catch((e) => {
            console.error(e);
            return new Array<Comic>();
        });
    }

    cachePagesRead(data: PagesReadData) {
        let pagesReadTable: Dexie.Table<PagesReadData, string> = this.dexieService.table('pagesRead');
        pagesReadTable.put(data)
            .catch(console.error);
    }

    getCachedPagesRead(comicURL: string): Promise<number[]> {
        let pagesReadTable: Dexie.Table<PagesReadData, string> = this.dexieService.table('pagesRead');
        return pagesReadTable.get({ comicurl: comicURL }).then((data) => {
            if (data)
                return this.unpackPagesRead(data);
            else
                return [];
        }).catch((e) => {
            console.error(e);
            return [];
        });
    }

    cacheComic(data: ComicData) {
        let comicTable: Dexie.Table<ComicData, string> = this.dexieService.table('comic');
        comicTable.put(data);
    }

    getCachedComic(comicURL: string): Promise<Comic> {
        let comicTable: Dexie.Table<ComicData, string> = this.dexieService.table('comic');
        return comicTable.get({ comicurl: comicURL }).then((data) => {
            if (data)
                return this.unpackComic(data);
            else
                return null;
        }).catch((e) => {
            console.error(e);
            return null;
        });
    }
}
