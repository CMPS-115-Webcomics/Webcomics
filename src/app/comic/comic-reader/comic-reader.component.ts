import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComicService } from '../comic.service';
import { Comic, Page, Chapter, Volume } from '../comic';
import { ComicMaps } from '../comic-maps';

@Component({
    selector: 'wcm-comic-reader',
    templateUrl: './comic-reader.component.html',
    styleUrls: ['./comic-reader.component.scss']
})


export class ComicReaderComponent implements OnInit {
    @Input() comic: Comic;
    @Input() page: Page;
    @Input() chapter: Chapter;
    @Input() volume: Volume;

    private pageIndex = -1;

    // these maps store array indices and corresponding objects, they are gotten by their ID key
    // i.e volumeMap.get(volumeID), volumeMap.set(volumeID, [arrayIndex, volume])
    private volumeMap: Map<number, [number, Volume]> = new Map<number, [number, Volume]>();
    private chapterMap: Map<number, [number, Chapter]> = new Map<number, [number, Chapter]>();
    private comicMaps: ComicMaps;

    constructor(
        private route: ActivatedRoute,
        private comicService: ComicService,
        private router: Router
    ) { }

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

    reload() {
        let nextPage = this.comic.pages[this.pageIndex];
        let URL = this.getURL(nextPage);
        this.router.navigate([URL]);
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

    hasNextPage(): boolean {
        return this.comic.pages[this.pageIndex + 1] != null;
    }

    hasPrevPage(): boolean {
        return this.comic.pages[this.pageIndex - 1] != null;
    }

    hasRandomPage(): boolean {
        return this.comic.pages.length > 1;
    }

    /*
    prevChapter(): void {
        // get the previous chapter by finding the corresponding index
        let prevChapterIndex = this.getChapterIndex(this.chapter.chapterID) - 1;
        let prevChapter = this.comic.chapters[prevChapterIndex];
        // find first index of page where chapter is lower than current
        for (var i = 0; i < this.comic.pages.length; ++i) {
            if (this.comic.pages[i].chapterID ==  prevChapter.chapterID) {
                this.pageIndex = i;
                break;
            }
        }
        // set page, volume, and chapter based on page index
        this.updatePage(this.pageIndex);
    }
    nextChapter(): void {
        // get the next chapter by finding the corresponding index
        let nextChapterIndex = this.getChapterIndex(this.chapter.chapterID) + 1;
        let nextChapter = this.comic.chapters[nextChapterIndex];
        // find first index of page where chapter is lower than current
        for (var i = 0; i < this.comic.pages.length; ++i) {
            if (this.comic.pages[i].chapterID ==  nextChapter.chapterID) {
                this.pageIndex = i;
                break;
            }
        }
        // set page, volume, and chapter based on page index
        this.updatePage(this.pageIndex);
    }
    hasPrevChapter(): boolean {
        let chapterIndex = this.getChapterIndex(this.chapter.chapterID);
        if (chapterIndex < 0) return false;
        return this.comic.chapters[chapterIndex - 1] != null;
    }
    hasNextChapter(): boolean {
        let chapterIndex = this.getChapterIndex(this.chapter.chapterID);
        if (chapterIndex < 0) return false;
        return this.comic.chapters[chapterIndex + 1] != null;
    }

    prevVolume(): void {
        // get the previous chapter by finding the corresponding index
        let prevVolumeIndex = this.getVolumeIndex(this.volume.volumeID) - 1;
        let prevVolume = this.comic.volumes[prevVolumeIndex];
        // find first index of page where chapter is lower than current
        for (var i = 0; i < this.comic.pages.length; ++i) {
            if (this.getChapter(this.comic.pages[i].chapterID).volumeID ==  prevVolume.volumeID) {
                this.pageIndex = i;
                break;
            }
        }
        // set page, volume, and chapter based on page index
        this.updatePage(this.pageIndex);
    }
    nextVolume(): void {
        // get the next volume by finding the corresponding index
        let nextVolumeIndex = this.getVolumeIndex(this.volume.volumeID) + 1;
        let nextVolume = this.comic.volumes[nextVolumeIndex];
        // find first index of page where chapter is lower than current
        for (var i = 0; i < this.comic.pages.length; ++i) {
            if (this.getChapter(this.comic.pages[i].chapterID).volumeID ==  nextVolume.volumeID) {
                this.pageIndex = i;
                break;
            }
        }
        // set page, volume, and chapter based on page index
        this.updatePage(this.pageIndex);
    }
    hasPrevVolume(): boolean {
        let volumeIndex = this.getVolumeIndex(this.volume.volumeID);
        if (volumeIndex < 0) return false;
        return this.comic.volumes[volumeIndex - 1] != null;
    }
    hasNextVolume(): boolean {
        let volumeIndex = this.getVolumeIndex(this.volume.volumeID);
        if (volumeIndex < 0) return false;
        return this.comic.volumes[volumeIndex + 1] != null;
    }
    */


    ngOnInit() {
        this.pageIndex = 0;
        this.getComic();
    }

    loadComic(comic: Comic) {
        this.comic = comic;
        this.comicMaps = new ComicMaps(this.comic);
        const pageNum = +this.route.snapshot.paramMap.get('page');
        const chapNum = +this.route.snapshot.paramMap.get('chapter');
        const volNum = +this.route.snapshot.paramMap.get('volume');

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
        this.route.params.subscribe(() => {
            this.updatePage();
        });

    }

    // retrieves corresponding comic with the same comicURL
    getComic(): void {
        const comicURL = this.route.snapshot.paramMap.get('comicURL');
        this.comicService.getComic(comicURL).subscribe(comic => this.loadComic(comic));
    }

}
