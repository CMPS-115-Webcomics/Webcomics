import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ComicService } from '../comic.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { apiURL } from '../../url';
import { unusedValidator } from '../../unused.validator';
import { AuthenticationService } from '../../user/authentication.service';



@Component({
    selector: 'wcm-create-comic',
    templateUrl: './create-comic.component.html',
    styleUrls: ['./create-comic.component.scss']
})

export class CreateComicComponent implements OnInit {
    public title: string;
    public comicURL: string;
    public description: string;
    public thumbnail: File;

    name: FormControl;
    url: FormControl;
    desc: FormControl;

    constructor(
        private comicService: ComicService,
        private http: HttpClient
    ) {
        this.name = new FormControl('', [Validators.required], [unusedValidator(http, 'title')]);
        this.url = new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9\-]+$/)], [unusedValidator(http, 'comicURL')]);
        this.desc = new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(500)]);
    }


    @ViewChild('previewImg') previewImg: ElementRef;
    public previewSrc;
    public previewWidth;
    public previewHeight;

    isValid() {
        return this.name.valid && this.url.valid && this.desc.valid && this.thumbnail;
    }

    urlError() {
        return this.url.hasError('required') ? 'You must enter a value' :
            this.url.hasError('pattern') ? 'Only lower case letters, numbers and dashes may be used.' :
                '';
    }

    descError() {
        return this.desc.hasError('required') ? 'You must enter a value' :
            this.desc.hasError('minlength') ? 'Must be at least 20 characters long.' :
                '';
    }



    submitComic() {
        this.comicService.createComic(this.title, this.comicURL, this.description, this.thumbnail);
    }

    ngOnInit() {
    }

    fileChange(event): void {
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            this.thumbnail = fileList[0];
        }
        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.previewWidth = 128;
            this.previewHeight = 128;
            this.previewSrc = e.target.result;
        };
        reader.readAsDataURL(this.thumbnail);
    }

}