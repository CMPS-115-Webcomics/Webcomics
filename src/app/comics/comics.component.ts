import { Component, OnInit } from '@angular/core';
import { ComicService } from '../comic.service';
import { Comic } from '../comic';

@Component({
    selector: 'wcm-comics',
    templateUrl: './comics.component.html',
    styleUrls: ['./comics.component.scss']
})
export class ComicsComponent implements OnInit {
    public comics: Comic[] = [
    ];

    constructor(private comicService: ComicService) { }

    ngOnInit() {
        this.comics = this.comicService.getComics();
    }

}
