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
        console.log(this.comicService.loadComics());
        /*
        //this.readComicIDs = this.comicStoreService.getReadComicIDs();
        this.comicStoreService.getReadComics().then(function (result) {
            console.log(result);
            console.log("hello");
        });
        this.comics = this.comicService.comics;
        if (this.comicService.comics.length === 0)
            this.comicService.loadComics();
        */
    }
}
