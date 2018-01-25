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

    private volumeMap: Map<number, Volume> = new Map<number, Volume>();
    private chapterMap: Map<number, Chapter> = new Map<number, Chapter>();

    constructor(
        private route: ActivatedRoute,
        private comicService: ComicService
    ) { }

    setPage(): void {
        if (this.pageIndex >= 0) {
            this.page = this.comic.pages[this.pageIndex];
            this.chapter = this.chapterMap.get(this.page.chapterID);
            this.volume = this.volumeMap.get(this.chapter.volumeID);
        }
    }

    prevPage(): void {
        --this.pageIndex;
        this.setPage();
    }
    nextPage(): void {
        ++this.pageIndex;
        this.setPage();
    }
    hasNextPage(): boolean {
        return this.comic.pages[this.pageIndex + 1] != null;
    }
    hasPrevPage(): boolean {
        return this.comic.pages[this.pageIndex - 1] != null;
    }


    ngOnInit() {
        this.getComic();
        this.pageIndex = 0;
        this.setPage();
    }

    getComic(): void {
        const comicURL = this.route.snapshot.paramMap.get('comicURL');
        this.comicService.getComic(comicURL).subscribe(comic => this.comic = comic);
        for (let volume of this.comic.volumes) {
            this.volumeMap.set(+volume.volumeID, volume);
        }
        for (let chapter of this.comic.chapters) {
            this.chapterMap.set(+chapter.chapterID, chapter);
        }
    }

}
