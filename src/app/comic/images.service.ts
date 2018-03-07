import { Injectable } from '@angular/core';

@Injectable()
export class ImagesService {
  private static imagePrefix = 'https://storage.googleapis.com/webcomic-storage';
  private webpAvalible = null;

  private getSize() {
    return this.webpAvalible ? 'high' : 'medium';
  }

  public getImageUrl(key: string, multires = true) {
    if (this.webpAvalible === null)
      this.webpAvalible = this.canUseWebP();
    const fn = key.replace(/\.[^/.]+$/, '');
    let ext = key.split('.').pop();
    if (this.webpAvalible)
      ext = 'webp';
    if (multires)
      return `${ImagesService.imagePrefix}/${fn}-${this.getSize()}.${ext}`;
    return `${ImagesService.imagePrefix}/${fn}.${ext}`;
  }

  private canUseWebP() {
    let elem = document.createElement('canvas');
    if (!!(elem.getContext && elem.getContext('2d'))) {
      return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    } else {
      return false;
    }
  }

}
