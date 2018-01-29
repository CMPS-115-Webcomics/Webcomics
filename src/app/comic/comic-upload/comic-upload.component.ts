import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComicService } from '../comic.service';
import { Comic, Page, Chapter, Volume } from '../comic';
import { HttpClient } from '@angular/common/http';

class FilePage extends Page {
    public file: File;
}

@Component({
    selector: 'wcm-comic-upload',
    templateUrl: './comic-upload.component.html',
    styleUrls: ['./comic-upload.component.scss']
})
export class ComicUploadComponent implements OnInit {
    @Input() comic: Comic;
    @Input() volumeOptions: Volume[] = [];
    @Input() chapterOptions: Chapter[] = [];
    pages: FilePage[] = [];

    selectedVolumeID = 0;
    selectedChapterID = 0;
    selectedVolume: Volume;
    selectedChapter: Chapter;
    public message: string;

    @ViewChild('fileInput') fileInput: ElementRef;
    private fileList: FileList = null;

    constructor(
        private route: ActivatedRoute,
        private comicService: ComicService,
        private http: HttpClient
    ) { }

    ngOnInit() {
        const comicURL = this.route.snapshot.paramMap.get('comicURL');
        this.comicService.getComic(comicURL).subscribe(comic => {
            this.comic = comic;
            this.gotoLastVolume();
        });
        this.volumeOptions = this.comic.volumes;
    }

    submit() {
        for (let page of this.pages) {

            let formData = new FormData() as any;

            page.imgURL = null;

            for (let attr in page) {
                formData.append(attr, page[attr]);
            }
            formData.append('comicID',  this.comic.comicID);
            console.log('submit', page, 'as', Array.from(formData.keys()));

            this.http.post('http://localhost:3000/api/comics/addPage', formData).toPromise()
                .then(console.log)
                .catch(console.error);
        }
    }

    gotoLastVolume() {
        if (this.comic.volumes.length !== 0) {
            let lastVol = this.comic.volumes[this.comic.volumes.length - 1];
            this.selectedVolume = lastVol;
            this.selectedVolumeID = lastVol.volumeID;
        } else {
            this.selectedVolumeID = 0;
        }
        this.onVolumeChange();
    }

    newChapter() {
        this.comic.addChapter();
        this.onVolumeChange();
    }

    newVolume() {
        this.comic.addVolume();
        this.volumeOptions = this.comic.volumes;
        this.gotoLastVolume();
    }

    deletePage(index: number) {
        for (let i = index; i < this.pages.length; i++) {
            this.pages[i].pageNumber--;
        }
        this.pages.splice(index, 1);
    }

    movePageUp(index: number) {
        this.swapPage(index, index - 1);
    }

    movePageDown(index: number) {
        this.swapPage(index, index + 1);
    }

    swapPage(i: number, j: number) {
        let tempPage = this.pages[i];
        this.pages[i] = this.pages[j];
        this.pages[j] = tempPage;

        let tempNum = this.pages[i].pageNumber;
        this.pages[i].pageNumber = this.pages[j].pageNumber;
        this.pages[j].pageNumber = tempNum;
    }

    getLastChapter() {
        let chapters = this.comic.chapters.filter(chapter => chapter.volumeID === this.selectedVolumeID);
        if (chapters.length === 0)
            return new Chapter(0, 0, 0);
        return chapters[chapters.length - 1];
    }

    gotoLastChapter() {
        this.selectedChapter = this.getLastChapter();
        this.selectedChapterID = this.selectedChapter.chapterID;
        this.onChapterChange();
    }

    getLastPage() {
        let pages = this.comic.pages.filter(page =>
            page.chapterID === this.selectedChapterID);
        return pages[pages.length - 1] || new Page(0, 0, 0, '', '');
    }

    onVolumeChange(): void {
        this.selectedVolume = this.comic.volumes.find(vol => vol.volumeNumber === this.selectedVolumeID);

        this.chapterOptions = [];
        for (let chapter of this.comic.chapters) {
            if (chapter.volumeID === this.selectedVolumeID) this.chapterOptions.push(chapter);
        }
        if (this.chapterOptions.length > 0) {
            this.selectedChapter = this.chapterOptions[0];
            this.selectedChapterID = this.selectedChapter.chapterID;
        } else {
            this.selectedChapterID = -1;
            this.selectedChapter = null;
        }

        this.gotoLastChapter();
    }

    onChapterChange(): void {
        let pageNumber = this.getLastPage().pageNumber;
        for (let page of this.pages) {
            ++pageNumber;
            page.pageNumber = pageNumber;
        }
    }

    fileChange(event): void {
        this.fileList = event.target.files;
    }

    uploadFiles() {
        if (this.fileList == null || this.fileList.length === 0) {
            this.message = 'Please select files to upload.';
            return;
        }
        if (this.selectedVolumeID > 0 && this.selectedChapterID <= 0) {
            this.message = 'If you selected a volume, you must select a chapter.';
            return;
        }

        if (this.fileList != null) {
            let pageNumber = this.getLastPage().pageNumber + this.pages.length;

            for (let i in this.fileList) {
                let file = this.fileList[i];
                if (file instanceof File) {
                    ++pageNumber;

                    let newPage = new FilePage(
                        Math.random(),
                        pageNumber,
                        this.selectedChapter ? this.selectedChapter.chapterID : null,
                        '',
                        ''
                    );
                    newPage.file = file;

                    this.pages.push(newPage);

                    const reader = new FileReader();
                    reader.onload = function (e: any) {
                        newPage.imgURL = e.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            }
        }
        this.fileInput.nativeElement.value = '';

        this.fileList = null;
    }

}
