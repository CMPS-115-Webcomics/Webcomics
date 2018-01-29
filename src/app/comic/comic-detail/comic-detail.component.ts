import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
        private router: Router
    ) { }

    getVolumeChapters(volume: Volume) {
        return this.comic.chapters.filter(chapter => chapter.volumeID === volume.volumeID)

    }

    ngOnInit() {
        this.getComic();
    }

    loadComic(comic: Comic) {
        this.comic = comic;
        this.baseLink = '/comic/' + this.comic.comicURL;
    }

    getComic(): void {
        const comicURL = this.route.snapshot.paramMap.get('comicURL');
        this.comicService.getComic(comicURL).subscribe(comic => this.loadComic(comic));
    }

}
