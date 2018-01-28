import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComicService } from '../comic.service';
import { Comic, Page, Chapter, Volume } from '../comic';

@Component({
    selector: 'wcm-comic-upload',
    templateUrl: './comic-upload.component.html',
    styleUrls: ['./comic-upload.component.scss']
})
export class ComicUploadComponent implements OnInit {
    @Input() comic: Comic;
    @Input() volumeOptions: Volume[] = [];
    @Input() chapterOptions: Chapter[] = [];

    selectedVolumeID: number = -1;
    selectedChapterID: number = -1;
    selectedVolume: Volume;
    selectedChapter: Chapter;

    public message: string;

    @ViewChild('fileInput') fileInput: ElementRef;
    private fileList: FileList;

    constructor(
        private route: ActivatedRoute,
        private comicService: ComicService,
    ) { }

    ngOnInit() {
        const comicURL = this.route.snapshot.paramMap.get('comicURL');
        this.comicService.getComic(comicURL).subscribe(comic => this.comic = comic);
        this.volumeOptions = this.comic.volumes;
    }

    onVolumeChange(event): void {
        for (let volume of this.comic.volumes) if (volume.volumeID == this.selectedVolumeID) this.selectedVolume = volume;

        this.chapterOptions = [];
        for (let chapter of this.comic.chapters) {
            if (chapter.volumeID == this.selectedVolumeID) this.chapterOptions.push(chapter);
        }
        if (this.chapterOptions.length > 0) {
            this.selectedChapter = this.chapterOptions[0];
            this.selectedChapterID = this.selectedChapter.chapterID;
        } else {
            this.selectedChapterID = -1;
            this.selectedChapter = null;
        }
        console.log(this.selectedVolumeID + ":" + this.selectedChapterID);
    }
    onChapterChange(event): void {
        console.log(this.selectedVolumeID + ":" + this.selectedChapterID);
    }

    fileChange(event): void {
        this.fileList = event.target.files;
    }
    uploadFiles() {
        if (this.fileList == null || this.fileList.length == 0) {
            this.message = "Please select files to upload.";
            return;
        }
        if (this.selectedVolumeID > 0 && this.selectedChapterID <= 0) {
            this.message = "If you selected a volume, you must select a chapter.";
            return;
        }
        // Disable the button while uploading
        this.fileInput.nativeElement.disabled = true;
        this.message = "Uploading."

        // Enable button and clear files when done uploading
        this.fileInput.nativeElement.disabled = false;


        if (this.fileList != null) {
            this.message = "";
            // TODO - determine latest page number of chapter (UNLESS DONE ON BACKEND)
            let pageNumber = 1;
            for (let i in this.fileList) {
                let file = this.fileList[i];
                if (file instanceof File) {
                    let URL = "comic/" + this.comic.comicURL;
                    if (this.selectedVolume != null) URL += "/" + this.selectedVolume.volumeNumber;
                    if (this.selectedChapter != null) URL += "/" + this.selectedChapter.chapterNumber;
                    URL += "/" + pageNumber;
                    ++pageNumber;
                    this.message += file.name + " uploaded: " + URL + "  |||  ";
                }
            }
            this.message += "uploaded";
        }
        this.fileInput.nativeElement.value = "";
        this.fileList = null;
    }

}
