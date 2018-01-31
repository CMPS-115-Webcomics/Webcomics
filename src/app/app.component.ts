import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './user/authentication.service';

@Component({
    selector: 'wcm-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(public auth: AuthenticationService) { }

    ngOnInit(): void {
    }
}
