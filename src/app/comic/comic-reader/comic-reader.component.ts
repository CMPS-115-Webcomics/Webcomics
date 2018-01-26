import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComicService } from '../comic.service';
import { Comic, Page, Chapter, Volume } from '../comic';

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

    private pageIndex: number = -1;

    // these maps store array indices and corresponding objects, they are gotten by their ID key
    // i.e volumeMap.get(volumeID), volumeMap.set(volumeID, [arrayIndex, volume])
    private volumeMap: Map<number, [number, Volume]> = new Map<number, [number, Volume]>();
    private chapterMap: Map<number, [number, Chapter]> = new Map<number, [number, Chapter]>();

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

    constructor(
        private route: ActivatedRoute,
        private comicService: ComicService
    ) { }

    // updates page, chapter, and volume given the array index of a page for the comic
    updatePage(pageIndex: number): void {
        if (pageIndex >= 0) {
            this.page = this.comic.pages[pageIndex];
            this.chapter = this.getChapter(this.page.chapterID);
            this.volume = this.getVolume(this.chapter.volumeID);
        }
    }

    prevPage(): void {
        --this.pageIndex;
        this.updatePage(this.pageIndex);
    }
    nextPage(): void {
        ++this.pageIndex;
        this.updatePage(this.pageIndex);
    }
    hasNextPage(): boolean {
        return this.comic.pages[this.pageIndex + 1] != null;
    }
    hasPrevPage(): boolean {
        return this.comic.pages[this.pageIndex - 1] != null;
    }

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


    ngOnInit() {
        this.getComic();
        this.pageIndex = 0;
        this.updatePage(this.pageIndex);
    }

    // retrieves corresponding comic with the same comicURL
    getComic(): void {
        const comicURL = this.route.snapshot.paramMap.get('comicURL');
        this.comicService.getComic(comicURL).subscribe(comic => this.comic = comic);
        for (let i in this.comic.volumes) {
            let volume = this.comic.volumes[i];
            this.volumeMap.set(+volume.volumeID, [+i, volume]);
        }
        for (let i in this.comic.chapters) {
            let chapter = this.comic.chapters[i];
            this.chapterMap.set(+chapter.chapterID, [+i, chapter]);
        }
    }

}
