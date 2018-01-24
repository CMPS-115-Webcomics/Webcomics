import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComicService } from '../comic.service';
import { Comic } from '../comic';

@Component({
  selector: 'wcm-comic-reader',
  templateUrl: './comic-reader.component.html',
  styleUrls: ['./comic-reader.component.scss']
})
export class ComicReaderComponent implements OnInit {
    @Input() comic: Comic;

    constructor(
        private route: ActivatedRoute,
        private comicService: ComicService
    ) { }

    ngOnInit() {
        this.getComic();
    }

    getComic(): void {
        const comicURL = this.route.snapshot.paramMap.get('comicURL');
        this.comicService.getComic(comicURL).subscribe(comic => this.comic = comic);
    }

}
