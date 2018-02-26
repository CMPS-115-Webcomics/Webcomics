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
   * Returns the subset of comcis whose title, tagline or description
   * contains the given query.
   */
  private searchComic(comics: Comic[], query: string) {
    query = query.toLowerCase();
    return comics.filter(comic =>
      comic.title.toLowerCase().includes(query) ||
      comic.tagline.toLowerCase().includes(query) ||
      comic.description.toLocaleLowerCase().includes(query)
    );
  }


  public findComics(query: string) {
    this.router.navigateByUrl('/comics').then(() => {
      this.onSearch(this.searchComic(this.comicService.comics, query));
    });
  }


}
