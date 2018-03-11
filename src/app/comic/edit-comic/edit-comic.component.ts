import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ComicService } from '../comic.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { apiURL } from '../../url';
import { existenceValidator, existingValidator } from '../../existence.validator';
import { AuthenticationService } from '../../user/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { Comic, Page, Chapter, Volume } from '../comic';


@Component({
    selector: 'wcm-edit-comic',
    templateUrl: './edit-comic.component.html',
    styleUrls: ['./edit-comic.component.scss']
})
export class EditComicComponent implements OnInit {
    @Input() comic: Comic;
    public title: string;
    public description: string;
    public tagline: string;
    public thumbnail: File;
    public comicURL: string;
    public comicID: number;

    name: FormControl;
    url: FormControl;
    desc: FormControl;
    tag: FormControl;
    working = false;

    constructor(
        private route: ActivatedRoute,
        private comicService: ComicService,
        private http: HttpClient
    ) {
        this.name = new FormControl('', [Validators.required],
            [existingValidator(http, 'title', this.comic.title)]);
        this.url = new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9\-]+$/)],
            [existenceValidator(http, 'comicURL')]);
        this.desc = new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(1000)]);
        this.tag = new FormControl('', [Validators.required, Validators.maxLength(30)]);
    }


    @ViewChild('previewImg') previewImg: ElementRef;
    public previewSrc;
    public previewWidth;
    public previewHeight;

    ngOnInit() {
        const comicURL = this.route.snapshot.paramMap.get('comicURL');
        this.comicService.getComic(comicURL).then(comic => {
            this.comic = comic;
            this.title = comic.title;
            this.tagline = comic.tagline;
            this.description = comic.description;
            this.comicID = comic.comicID;
        });
        // this.name.setValidators(existingValidator(this.http, 'title', this.comic.title));
    }

    isValid() {
        return this.name.valid && this.desc.valid && this.thumbnail && this.tag.valid;
    }

    nameError(currentTitle: string) {
        return this.name.hasError('required') ? 'You must enter a value' :
            this.name.hasError('availability') ? 'That title is already in use.' :
                '';
    }

    urlError() {
        return this.url.hasError('required') ? 'You must enter a value.' :
            this.url.hasError('pattern') ? 'Only lower case letters, numbers and dashes may be used.' :
                this.url.hasError('availability') ? 'That URL is already in use.' :
                '';
    }

    descError() {
        return this.desc.hasError('required') ? 'You must enter a value.' :
            this.desc.hasError('minlength') ? 'Must be at least 20 characters long.' :
                '';
    }

    tagError() {
        return this.desc.hasError('required') ? 'You must enter a value.' :
            '';
    }

    submitComic() {
        this.working = true;
        this.comicService.editComic(this.title, this.description, this.tagline, this.thumbnail, this.comicURL, this.comicID)
            .then(() => this.working = false)
            .catch(() => this.working = false);
    }

    validateImage(data) {
        let img = new Image();
        img.src = data;
        img.onload = () => {
            console.log(img.height, img.width, img.width / img.height);
        };
    }


    fileChange(event): void {
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            this.thumbnail = fileList[0];
        }
        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.previewSrc = e.target.result;
            this.validateImage(e.target.result);

        };
        reader.readAsDataURL(this.thumbnail);
    }

}
