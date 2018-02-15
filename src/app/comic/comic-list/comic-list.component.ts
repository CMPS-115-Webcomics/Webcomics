import { Component, OnInit } from '@angular/core';
import { ComicService } from '../comic.service';
import { ComicStoreService } from '../comic-store.service';
import { Comic } from '../comic';

@Component({
    selector: 'wcm-comics',
    templateUrl: './comic-list.component.html',
    styleUrls: ['./comic-list.component.scss']
})
export class ComicListComponent implements OnInit {
    public comics: Comic[] = [];
    public readComicIDs: number[];

    constructor(
        private comicService: ComicService,
        private comicStoreService: ComicStoreService,
    ) {}

    ngOnInit() {
        this.readComicIDs = this.comicStoreService.getReadComicIDs();
        this.comics = this.comicService.comics;
        if (this.comicService.comics.length === 0)
            this.comicService.loadComics();
    }

}
