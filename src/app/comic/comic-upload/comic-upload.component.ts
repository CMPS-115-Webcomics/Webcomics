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
    }

    fileChange(event): void {
        this.fileList = event.target.files;
    }
    uploadFiles() {
        // Disable the button while uploading
        this.fileInput.nativeElement.disabled = true;
        this.message = "Uploading."

        // Enable button and clear files when done uploading
        this.fileInput.nativeElement.disabled = false;
        if (this.fileList != null) {
            this.message = "";
            for (let i in this.fileList) {
                let file = this.fileList[i];
                if (file instanceof File)
                    this.message += file.name + " ";
            }
            this.message += "uploaded";
        }
        this.fileInput.nativeElement.value = "";
        this.fileList = null;
    }

}
