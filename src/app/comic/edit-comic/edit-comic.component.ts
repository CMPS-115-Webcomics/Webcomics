import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ComicService } from '../comic.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { apiURL } from '../../url';
import { existenceValidator } from '../../existence.validator';
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


    @ViewChild('previewImg') previewImg: ElementRef;
    public previewSrc;
    public previewWidth;
    public previewHeight;

    constructor(
        private route: ActivatedRoute,
        private comicService: ComicService,
        private http: HttpClient
    ) { }

    ngOnInit() {
        const comicURL = this.route.snapshot.paramMap.get('comicURL');
        this.comicService.getComic(comicURL).then(comic => {
            this.name = new FormControl('', [Validators.required],
                [existenceValidator(this.http, 'title', false, false, comic.title)]
            );
            // [existenceValidator(http, 'title')]);
            this.url = new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9\-]+$/)],
                [existenceValidator(this.http, 'comicURL')]);
            this.desc = new FormControl('', [Validators.required, Validators.maxLength(1000)]);
            this.tag = new FormControl('', [Validators.required, Validators.maxLength(30)]);
            this.comic = comic;
            this.title = comic.title;
            this.tagline = comic.tagline;
            this.description = comic.description;
            this.comicID = comic.comicID;

        });
        // this.name.setValidators(existingValidator(this.comic.comicURL, this.title, this.comic.title));
    }

    isValid() {
        return this.name.valid && this.desc.valid  && this.tag.valid;
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

    private startRequest() {
        this.name.disable();
        this.tag.disable();
        this.desc.disable();
        this.working = true;
    }

    private endRequest(err?) {
        if (err) {
            console.error(err);
        }
        this.name.enable();
        this.tag.enable();
        this.desc.enable();
        this.working = false;
    }

    submitComic() {
        this.startRequest();
        this.comicService.editComic(this.title, this.description, this.tagline, this.thumbnail, this.comicURL, this.comicID)
            .then(() =>  this.endRequest())
            .catch((err) => this.endRequest(err));
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
