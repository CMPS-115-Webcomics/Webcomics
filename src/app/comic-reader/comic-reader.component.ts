import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComicService } from '../comic.service';
import { Comic, Page } from '../comic';

@Component({
  selector: 'wcm-comic-reader',
  templateUrl: './comic-reader.component.html',
  styleUrls: ['./comic-reader.component.scss']
})
export class ComicReaderComponent implements OnInit {
    @Input() comic: Comic;
    @Input() page: Page;

    private pageIndex: number;

    constructor(
        private route: ActivatedRoute,
        private comicService: ComicService
    ) { }

    getPage(index: number): void {
        if (this.comic.pages.length > 0) {
            this.page = this.comic.pages[index];
            console.log(this.page);
            console.log(index);
        }
    }
    prevPage(): void {
        --this.pageIndex;
        this.getPage(this.pageIndex);
    }
    nextPage(): void {
        ++this.pageIndex;
        this.getPage(this.pageIndex);
    }
    hasNextPage(): boolean {
        console.log(this.comic.pages.length);
        return this.comic.pages[this.pageIndex + 1] != null;
    }
    hasPrevPage(): boolean {
        return this.comic.pages[this.pageIndex - 1] != null;
    }

    ngOnInit() {
        this.getComic();
        this.pageIndex = 0;
        this.getPage(this.pageIndex);
    }

    getComic(): void {
        const comicURL = this.route.snapshot.paramMap.get('comicURL');
        this.comicService.getComic(comicURL).subscribe(comic => this.comic = comic);
    }

}
