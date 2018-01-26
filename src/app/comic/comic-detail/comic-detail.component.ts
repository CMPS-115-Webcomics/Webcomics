import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComicService } from '../comic.service';
import { Comic, Page, Chapter, Volume } from '../comic';

@Component({
    selector: 'wcm-comic-detail',
    templateUrl: './comic-detail.component.html',
    styleUrls: ['./comic-detail.component.scss']
})
export class ComicDetailComponent implements OnInit {
    @Input() comic: Comic;
    @Input() baseLink: string;

    constructor(
        private route: ActivatedRoute,
        private comicService: ComicService,
    ) { }

    ngOnInit() {
        this.getComic();
        this.baseLink = '/comic/' + this.comic.comicURL;
        console.log(this.baseLink);
    }

    getComic(): void {
        const comicURL = this.route.snapshot.paramMap.get('comicURL');
        this.comicService.getComic(comicURL).subscribe(comic => this.comic = comic);
    }

}
