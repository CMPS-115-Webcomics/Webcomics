import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'wcm-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'wcm';
    results: string[];

    constructor() {}

    ngOnInit(): void {
    }
}
