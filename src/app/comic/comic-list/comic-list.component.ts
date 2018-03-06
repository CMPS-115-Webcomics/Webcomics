import { Component, OnInit } from '@angular/core';
import { ComicService } from '../comic.service';
import { ComicStoreService } from '../comic-store.service';
import { Comic } from '../comic';
import { MessageService } from '../../message/message.service';
import { AuthenticationService } from '../../user/authentication.service';
import { SearchService } from '../search.service';

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
        private messageService: MessageService,
        public auth: AuthenticationService,
        private searchService: SearchService,
        private comicStoreService: ComicStoreService
    ) {}

    ngOnInit() {
        this.comics = this.comicService.comics;
        if (this.comicService.comics.length === 0)
            this.comicService.loadComics();
        this.searchService.onSearch = (queriedComics) => {
            this.comics = queriedComics;
        };
    }

    message(comic: Comic) {
        this.messageService.openMessageDialog(comic.accountID);
    }

    banOwner(comic: Comic) {
        this.auth.ban(comic.accountID, comic.title);
    }

}
