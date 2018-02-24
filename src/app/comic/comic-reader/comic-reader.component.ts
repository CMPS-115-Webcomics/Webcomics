import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComicService } from '../comic.service';
import { Comic, Page, Chapter, Volume } from '../comic';
import { ComicMaps } from '../comic-maps';
import { pageAnimation, pageChangeTime } from './page.animation';
import { ComicStoreService } from '../comic-store.service';


@Component({
    selector: 'wcm-comic-reader',
    templateUrl: './comic-reader.component.html',
    styleUrls: ['./comic-reader.component.scss'],
    animations: [pageAnimation]
})
export class ComicReaderComponent implements OnInit, AfterViewInit {
    private static pagesToPreload = 5;
    private static preloadDelay = 250; // ms before preloading starts

    @Input() comic: Comic = Comic.empty;
    @Input() page: Page = Page.empty;
    @Input() chapter: Chapter;
    @Input() volume: Volume;

    @ViewChild('readerDisplay') image: ElementRef;


    private currentComic: string;
    private pageIndex = -1;
    public imageLoading = true;

    // these maps store array indices and corresponding objects, they are gotten by their ID key
    // i.e volumeMap.get(volumeID), volumeMap.set(volumeID, [arrayIndex, volume])
    private volumeMap: Map<number, [number, Volume]> = new Map<number, [number, Volume]>();
    private chapterMap: Map<number, [number, Chapter]> = new Map<number, [number, Chapter]>();
    private comicMaps: ComicMaps;

    constructor(
        private route: ActivatedRoute,
        private comicService: ComicService,
        private router: Router,
    ) { }

    ngAfterViewInit() {
        this.image.nativeElement.onload = (e) => {
            setTimeout(() => {
                this.imageLoading = false;
                this.preloadNextPages();
            }, 10);
        };

    }

    ngOnInit() {
        this.pageIndex = 0;
        this.handleRoute();
    }


    handleRoute() {
        this.route.params.subscribe(async (params) => {
            if (this.currentComic === params.comicURL) {
                this.loadURLPage(params as { page: string, chapter: string, volume: string });
                return;
            }

            this.currentComic = params.comicURL;
            this.comicService.getCachedComic(params.comicURL).then((cachedComic) => {
                if (cachedComic) {
                    this.loadComic(cachedComic);
                    this.loadURLPage(params as { page: string, chapter: string, volume: string });
                }
                this.comicService.getComic(params.comicURL).then((networkComic) => {
                    this.loadComic(networkComic);
                    if (!cachedComic)
                        this.loadURLPage(params as { page: string, chapter: string, volume: string });
                });
            });
        });
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

    // updates page, chapter, and volume given the array index of a page for the comic
    updatePage(): void {
        if (this.pageIndex >= 0) {
            this.page = this.comic.pages[this.pageIndex];
            this.chapter = this.comicMaps.getChapter(this.page.chapterID);
            if (this.chapter != null)
                this.volume = this.comicMaps.getVolume(this.chapter.volumeID);
            this.comicService.addPageRead(this.comic.comicURL, this.page);
        }
    }



    preloadNextPages() {
        for (let i = 1; i <= ComicReaderComponent.pagesToPreload; i++) {
            let index = this.pageIndex + i;
            if (!this.comic.pages[index]) break;
            let img = new Image();
            img.src = this.comic.pages[index].imgURL;
        }
    }

    getURL(page: Page): string {
        let URL: string = 'comic/' + this.comic.comicURL + '/';
        if (page != null) {
            let chapter, volume = null;
            chapter = this.comicMaps.getChapter(page.chapterID);
            if (chapter != null) volume = this.comicMaps.getVolume(chapter.volumeID);

            if (volume != null) URL += volume.volumeNumber + '/';
            if (chapter != null) URL += chapter.chapterNumber + '/';
            URL += page.pageNumber;
        }
        return URL;
    }

    animatePageChange(params: { page: string, chapter: string, volume: string }) {
        this.imageLoading = true;
        setTimeout(this.loadURLPage(params), pageChangeTime);
    }

    loadURLPage(params: { page: string, chapter: string, volume: string }) {
        const pageNum = parseInt(params.page, 10) || 0;
        const chapNum = parseInt(params.chapter, 10) || 0;
        const volNum = parseInt(params.volume, 10) || 0;

        if (volNum > 0) {
            for (let volume of this.comic.volumes)
                if (volume.volumeNumber === volNum)
                    this.volume = volume;
        }
        if (chapNum > 0) {
            for (let chapter of this.comic.chapters)
                if ((this.volume == null || this.volume.volumeID === chapter.volumeID) && chapter.chapterNumber === chapNum)
                    this.chapter = chapter;
        }
        if (pageNum > 0) {
            // finds first page with matching chapter and page numbers
            for (let i in this.comic.pages) {
                let page = this.comic.pages[i];
                // don't need to check if volumes are matching since same chapter implies same volume
                if ((this.chapter == null || this.chapter.chapterID === page.chapterID) && page.pageNumber === pageNum) {
                    this.pageIndex = +i;
                    break;
                }
            }
        }
        this.updatePage();
    }

    // Page Change Controls

    reload() {
        this.imageLoading = true;
        setTimeout(() => {
            let nextPage = this.comic.pages[this.pageIndex];
            this.router.navigateByUrl(this.getURL(nextPage));
        }, pageChangeTime);
    }

    prevPage(): void {
        if (!this.hasPrevPage()) return;
        --this.pageIndex;
        this.reload();
    }

    firstPage(): void {
        if (!this.hasPrevPage()) return;
        this.pageIndex = 0;
        this.reload();
    }

    nextPage(): void {
        if (!this.hasNextPage()) return;
        ++this.pageIndex;
        this.reload();
    }

    randomPage(): void {
        if (!this.hasRandomPage()) return;
        let randPage = this.pageIndex;
        while (randPage === this.pageIndex)
            randPage = Math.floor(Math.random() * (this.comic.pages.length));
        this.pageIndex = randPage;
        this.reload();
    }

    lastPage(): void {
        if (!this.hasNextPage()) return;
        this.pageIndex = this.comic.pages.length - 1;
        this.reload();
    }

    smartSkip() {
        if (!this.hasSmartSkip()) return;
        this.pageIndex = this.getSmartSkipDest();
        this.reload();
    }

    smartReturn() {
        if (!this.hasSmartReturn()) return;
        this.pageIndex = this.getSmartSkipDest(-1);
        this.reload();
    }

    private getSmartSkipDest(dir = 1) {
        const pages = this.comic.pages;
        for (let i = this.pageIndex;  i >= 0 && i < pages.length; i += dir) {
            if (!this.comicService.pagesRead.has(pages[i].pageID)) {
                return i;
            }
        }
        return null;
    }

    hasSmartSkip() {
        return this.getSmartSkipDest() !== null;
    }

    hasSmartReturn() {
        return this.getSmartSkipDest(-1) !== null;
    }

    hasNextPage(): boolean {
        return this.comic.pages[this.pageIndex + 1] != null;
    }

    hasPrevPage(): boolean {
        return this.comic.pages[this.pageIndex - 1] != null;
    }

    hasRandomPage(): boolean {
        return this.comic.pages.length > 1;
    }


    loadComic(comic: Comic) {
        this.comic = comic;
        this.comicMaps = new ComicMaps(this.comic);
    }

}
