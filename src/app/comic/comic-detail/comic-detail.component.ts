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

    isMine() {
        return this.comicService.myComics.find(comic => comic.comicID === this.comic.comicID);
    }

    getVolumeChapters(volume: Volume) {
        return this.comic.chapters.filter(chapter => chapter.volumeID === volume.volumeID);
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
        //let cached = this.comicService.getCachedComic(comicURL);
        /*
        if (cached)
            this.loadComic(cached);
*/
        this.comicService.getComic(comicURL)
            .then(comic => this.loadComic(comic));
    }

}
