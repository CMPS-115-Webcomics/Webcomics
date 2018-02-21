import { Injectable } from '@angular/core';
import { Comic } from './comic';
import { ComicService } from './comic.service';
import { Router } from '@angular/router';

@Injectable()
export class SearchService {
  public onSearch: (results: Comic[]) => void = () => null;


  constructor(
    private comicService: ComicService,
    private router: Router
  ) { }

  /**
   * Returns the subset of comcis whose title or description
   * contains the given query.
   */
  private searchComic(comics: Comic[], query: string) {
    let results: Comic[] = [];
    for (let i = 0; i < comics.length; i++) {
      if (comics[i].title.includes(query) || comics[i].description.includes(query)) {
        results.push(comics[i]);
      }
    }
    return results;
  }


  public findComics(query: string) {
    this.router.navigateByUrl('/comics').then(() => {
      this.onSearch(this.searchComic(this.comicService.comics, query));
    });
  }


}
