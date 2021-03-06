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
    private filter: ((comics: Comic[]) => Comic[]) = (comics) => comics;

    constructor(
        private comicService: ComicService,
        private messageService: MessageService,
        public auth: AuthenticationService,
        private searchService: SearchService,
        private comicStoreService: ComicStoreService
    ) { }

    ngOnInit() {
        this.comics = this.comicService.getComics();
        this.searchService.onSearch = (filter) => {
            this.filter = filter;
        };
    }

    getComics() {
        return this.filter(this.comicService.comics);
    }

    message(comic: Comic) {
        this.messageService.openMessageDialog(comic.accountID);
    }

    delete(comic: Comic) {
        this.auth.openChallengePrompt(comic.title, `delete the comic "${comic.title}"`).then((passed) => {
            if (!passed) return;
            this.comicService.delete(comic);
        });
    }

    banOwner(comic: Comic) {
        this.auth.openChallengePrompt(comic.title, `ban the owner of the comic "${comic.title}`).then((passed) => {
            if (!passed) return;
            this.auth.ban(comic.accountID);
        });
    }

}
