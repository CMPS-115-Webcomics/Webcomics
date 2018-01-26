import { Component, OnInit } from '@angular/core';
import { ComicService } from '../comic.service';
import { Comic } from '../comic';

@Component({
    selector: 'wcm-comics',
    templateUrl: './comic-list.component.html',
    styleUrls: ['./comic-list.component.scss']
})
export class ComicListComponent implements OnInit {
    public comics: Comic[] = [
    ];

    constructor(private comicService: ComicService) { }

    ngOnInit() {
        this.comics = this.comicService.getComics();
    }

}
