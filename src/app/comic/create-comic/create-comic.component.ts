import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';


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
        reader.onload = (e) => {
            this.previewImg.nativeElement.src = e.target.result;
        }
        reader.readAsDataURL(this.file);
        console.log(this.file, this.title, this.comicURL, this.description);
    }

}
