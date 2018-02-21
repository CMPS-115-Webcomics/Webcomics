import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthenticationService } from './user/authentication.service';
import { ComicService } from './comic/comic.service';
import { MessageService } from './message/message.service';
import { SearchService } from './comic/search.service';

@Component({
    selector: 'wcm-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    query: string;
    
    constructor(
        public auth: AuthenticationService,
        public comics: ComicService,
        public messages: MessageService,
        private search: SearchService
    ) { }

    public logout() {
        this.auth.logout();
    }

    searchComic() {
        this.search.findComics(this.query);
    }

    ngOnInit(): void {
    }
}
