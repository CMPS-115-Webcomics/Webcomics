import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';


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

    constructor() { }

    submitComic() {
        console.log(this.title,
            this.comicURL,
            this.description,
            this.file);
    }

    ngOnInit() {
    }

    fileChange(event): void {
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            this.file = fileList[0];
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            this.previewSrc = e.target.result;
        };
        reader.readAsDataURL(this.file);
        console.log(this.file, this.title, this.comicURL, this.description);
    }

}
