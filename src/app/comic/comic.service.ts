import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comic, Page, Chapter, Volume } from './comic';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { apiURL } from '../url';
import { AuthenticationService } from '../user/authentication.service';
import { Router } from '@angular/router';
import { ComicStoreService, ComicData, ComicListData } from './comic-store.service';
import { ImagesService } from './images.service';

@Injectable()
export class ComicService {
    public comics: Comic[] = [];
    public comic: Comic;
    public pagesRead = new Set<number>();
    public myComics: Comic[] = [];

    constructor(
        private http: HttpClient,
        private router: Router,
        private auth: AuthenticationService,
        private imageService: ImagesService,
        private comicStoreService: ComicStoreService
    ) {
        auth.onAuth((username) => {
            if (username)
                this.loadMyComics();
            else
                this.myComics.length = 0;
        });
    }

    public delete(comic: Comic) {
        return this.http.post(`${apiURL}/api/comics/deleteComic`, {
            comicID: comic.comicID,
        }, { headers: this.auth.getAuthHeader() })
            .toPromise()
            .then(() => alert(`Comic ${comic.title} Deleted`))
            .catch(console.error);
    }

    public createComic(title: string, comicURL: string, organization: string, description: string, tagline: string, thumbnail: File) {
        let body = new FormData();

        body.set('title', title);
        body.set('comicURL', comicURL);
        body.set('organization', organization);
        body.set('description', description);
        body.set('tagline', tagline);
        body.set('thumbnail', thumbnail);

        return this.http.post(`${apiURL}/api/comics/create`, body, { headers: this.auth.getAuthHeader() })
            .toPromise()
            .then(() => {
                this.router.navigate([`comic/${comicURL}/upload`]);
                this.loadComics();
                this.loadMyComics();
            })
            .catch(console.error);
    }

    public uploadPage(file: File, page: Page) {
        let formData = new FormData();

        page.imgURL = null;

        for (let attr in page) {
            formData.append(attr, page[attr]);
        }
        formData.append('comicID', this.comic.comicID.toString());

        return this.http.post(`${apiURL}/api/comics/addPage`, formData, { headers: this.auth.getAuthHeader() })
            .toPromise()
            .catch(console.error);
    }

    public addVolume(comic: Comic) {
        let volNum = Math.max(1, Math.max(...comic.volumes.map(volume => volume.volumeNumber)) + 1);
        return this.http.post(`${apiURL}/api/comics/addVolume`, {
            comicID: comic.comicID,
            volumeNumber: volNum
        }, { headers: this.auth.getAuthHeader() })
            .toPromise()
            .then((data: any) => {
                let newVolume = new Volume(
                    data.volumeid,
                    volNum
                );
                comic.addVolume(newVolume);
                return newVolume;
            });
    }

    public addChapter(comic: Comic, volume?: Volume) {
        const parent = volume || comic.volumes[comic.volumes.length - 1];
        const volumeID = parent ? parent.volumeID : null;
        const chapterNumber = Math.max(...comic.chapters
            .filter(chapter => chapter.volumeID === volumeID)
            .map(chapter => chapter.chapterNumber)
            .concat(0)) + 1;
        return this.http.post(`${apiURL}/api/comics/addChapter`, {
            comicID: comic.comicID,
            chapterNumber,
            volumeID
        }, { headers: this.auth.getAuthHeader() })
            .toPromise()
            .then((data: any) => {
                let newChapter = new Chapter(
                    data.chapterid,
                    volumeID,
                    chapterNumber
                );
                comic.addChapter(newChapter);
                return newChapter;
            });
    }

    public getComic(comicURL: string): Promise<Comic> {
        return Promise.all([
            this.loadCachedPageRead(comicURL),
            this.http.get(apiURL + '/api/comics/get/' + comicURL)
                .toPromise()
                .then((data: ComicData) => {
                    data.pages.forEach(page => {
                        page.imgurl = this.imageService.getImageUrl(page.imgurl);
                    });
                    this.comicStoreService.cacheComic(data);
                    this.comic = this.comicStoreService.unpackComic(data);
                    this.pagesRead = new Set<number>();
                    return this.comic;
                })
        ]).then(res => res[1]);

    }

    public getCachedComic(comicURL: string) {
        return this.loadCachedPageRead(comicURL).then(() =>
            this.comicStoreService.getCachedComic(comicURL));

    }

    private loadComicType(name: string, storage: Array<Comic>) {
        const unloader = (comics: Comic[]) => {
            storage.length = 0;
            for (let comic of comics) {
                storage.push(comic);
            }
        };

        this.comicStoreService.getCachedComicList(name).then((cached: Comic[]) => {
            this.comics = cached;
            this.http.get(apiURL + '/api/comics/' + name, {
                headers: this.auth.getAuthHeader()
            }).toPromise()
                .then((data: ComicListData[]) => {
                    data.forEach(item => item.thumbnailurl = this.imageService.getImageUrl(item.thumbnailurl, false));
                    unloader(data.map(this.comicStoreService.unpackComicListItem));
                    this.comicStoreService.cacheComicList(data, name);
                }).catch((e) => {
                    console.error(e);
                });
        });
    }

    private loadCachedPageRead(comicURL: string) {
        return this.comicStoreService.getCachedPagesRead(comicURL).then((cachedPagesRead) => {
            if (!cachedPagesRead) return;
            for (let pageID of cachedPagesRead) {
                this.pagesRead.add(pageID);
            }
        });
    }

    public addPageRead(comicURL: string, page: Page) {
        this.pagesRead.add(page.pageID);
        this.comicStoreService.cachePagesRead(
            this.comicStoreService.packPagesRead(comicURL, this.pagesRead));
    }

    public loadMyComics() {
        this.loadComicType('myComics', this.myComics);
    }

    public loadComics() {
        this.loadComicType('comics', this.comics);
    }
}


