import { Injectable } from '@angular/core';
import { Comic } from './comic';

@Injectable()
export class ComicService {
    private COMICS: Comic[] = [
        {
            comicID: 1,
            accountID: 1,
            title: "cool",
            comicURL: "cool",
            description: "a cool comic"
        },
        {
            comicID: 2,
            accountID: 1,
            title: "cooler",
            comicURL: "coolio",
            description: "a cooler comic"
        }
    ];

    getComics(): Comic[] {
        return this.COMICS;
    }

    constructor() { }

}
