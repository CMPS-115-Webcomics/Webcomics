import { Component, OnInit } from '@angular/core';
import { ComicService } from '../../comic/comic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Comic } from '../../comic/comic';

@Component({
    selector: 'wcm-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    public comics: Comic[] = [];

    constructor(
        private comicService: ComicService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        const accountID = this.route.snapshot.paramMap.get('accountID');
        this.comics = this.comicService.comics;
        if (this.comicService.comics.length === 0)
            this.comicService.loadComics();
    }
}
