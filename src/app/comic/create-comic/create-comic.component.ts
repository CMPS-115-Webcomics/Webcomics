import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';


@Component({
  selector: 'wcm-create-comic',
  templateUrl: './create-comic.component.html',
  styleUrls: ['./create-comic.component.scss']
})
export class CreateComicComponent implements OnInit {
    public title: string = "";
    public comicURL: string = "";
    public description: string;
    public file: File;

    @Input() message: string;

    @ViewChild('previewImg') previewImg: ElementRef;

    constructor() { }

    ngOnInit() {
    }

    fileChange(event): void {
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            this.file = fileList[0];
        }

        var reader = new FileReader();
        reader.onload = (e: any) => {
            this.previewImg.nativeElement.src = e.target.result;
            this.previewImg.nativeElement.width = 128;
            this.previewImg.nativeElement.height = 128;
        }
        reader.readAsDataURL(this.file);
        console.log(this.file, this.title, this.comicURL, this.description);
    }

    submitComic(): void {
        this.message = "";
        if (this.title.match(/[^a-zA-Z0-9-_ ]/)) {
            this.message += "Title has invalid characters. ";
        }
        if (this.title.length < 1 || this.title.length > 255) this.message += "Title must be between 1 and 255 characters. ";

        if (this.comicURL.match(/^[a-zA-Z0-9-_ ]/)) {
            this.message += "Comic URL has invalid characters. ";
        }
        if (this.comicURL.length < 1 || this.title.length > 255) this.message += "Comic URL must be between 1 and 255 characters. ";
        if (this.description.length > 255) this.message += "Description must be 255 or less words. ";


        //TODO upload image
        // wait for response
        // if res
            // let thumbnailURL = res;
            // send data to api
            // wait for response
            // if res2
                // let url = res.url
                // redirect to url
            // else if err
                // send err and redirect
        // else if err
            // send err and redirect

    }

}
