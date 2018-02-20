import { Component, OnInit } from '@angular/core';
import { ComicService } from '../comic.service';
import { Comic } from '../comic';
import { MessageService } from '../../message/message.service';
import { AuthenticationService } from '../../user/authentication.service';

@Component({
    selector: 'wcm-comics',
    templateUrl: './comic-list.component.html',
    styleUrls: ['./comic-list.component.scss']
})
export class ComicListComponent implements OnInit {
    public comics: Comic[] = [];

    constructor(
        private comicService: ComicService,
        private messageService: MessageService,
        public auth: AuthenticationService
    ) {
        this.comics = this.comicService.comics;
        if (this.comicService.comics.length === 0)
            this.comicService.loadComics();
    }

    message(comic: Comic) {
        this.messageService.openMessageDialog(comic.accountID);
    }

    ngOnInit() {

    }

}
