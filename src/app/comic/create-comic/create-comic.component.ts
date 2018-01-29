import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ComicService } from '../comic.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
    selector: 'wcm-create-comic',
    templateUrl: './create-comic.component.html',
    styleUrls: ['./create-comic.component.scss']
})

export class CreateComicComponent implements OnInit {
    public title: string;
    public comicURL: string;
    public description: string;
    public file: File;

    name = new FormControl('', [Validators.required]);
    url = new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9\-]+$/)]);
    desc = new FormControl('', [Validators.required, Validators.minLength(100), Validators.maxLength(500)]);


    @ViewChild('previewImg') previewImg: ElementRef;
    public previewSrc;
    public previewWidth;
    public previewHeight;

    urlError() {
        return this.url.hasError('required') ? 'You must enter a value' :
        this.url.hasError('pattern') ? 'Only lower case letters, numbers and dashes may be used.' :
        '';
    }

    descError() {
        return this.desc.hasError('required') ? 'You must enter a value' :
            this.desc.hasError('minlength') ? 'Must be at least 100 characters long.' :
            '';
    }

    constructor(
        private comicService: ComicService,
        private http: HttpClient,
    ) { }

    submitComic() {
        let thumbnailURL = "http://www.clker.com/cliparts/O/v/c/b/i/6/generic-logo-hi.png";
        let userID = "1";
        let URL = this.comicService.URL;

        let body = new URLSearchParams();
        body.set('title', this.title);
        body.set('comicURL', this.comicURL);
        body.set('description', this.description);
        body.set('userID', userID);
        body.set('thumbnailURL', thumbnailURL);
        let options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };

        this.http.post(URL + "/api/comics/create", body.toString(), options).subscribe(
            data => {
                console.log("created: " + data[0]);
            },
            error => {
                console.log("failed: " +  error);
            }
);
    }

    ngOnInit() {
    }

    fileChange(event): void {
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            this.file = fileList[0];
        }
        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.previewWidth = 128;
            this.previewHeight = 128;
            this.previewSrc = e.target.result;
        };
        reader.readAsDataURL(this.file);
        console.log(this.file, this.title, this.comicURL, this.description);
    }

}
