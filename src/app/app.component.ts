import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './user/authentication.service';
import { ComicService } from './comic/comic.service';

@Component({
    selector: 'wcm-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(public auth: AuthenticationService,
        public comics: ComicService) { }

    public logout() {
        this.auth.logout();
    }

    ngOnInit(): void {
    }
}
