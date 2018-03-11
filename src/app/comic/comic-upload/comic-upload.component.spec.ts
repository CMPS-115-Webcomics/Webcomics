import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComicService } from '../comic.service';
import { ComicUploadComponent } from './comic-upload.component';

describe('ComicUploadComponent', () => {
    let comp: ComicUploadComponent;
    let fixture: ComponentFixture<ComicUploadComponent>;

    beforeEach(() => {
        const activatedRouteStub = {
            snapshot: {
                paramMap: {
                    get: () => ({})
                }
            }
        };
        const comicServiceStub = {
            getComic: () => ({
                then: () => ({})
            }),
            uploadPage: () => ({
                then: () => ({})
            }),
            addChapter: () => ({
                then: () => ({})
            }),
            addVolume: () => ({
                then: () => ({})
            })
        };
        TestBed.configureTestingModule({
            declarations: [ ComicUploadComponent ],
            schemas: [ NO_ERRORS_SCHEMA ],
            providers: [
                { provide: ActivatedRoute, useValue: activatedRouteStub },
                { provide: ComicService, useValue: comicServiceStub }
            ]
        });
        fixture = TestBed.createComponent(ComicUploadComponent);
        comp = fixture.componentInstance;
    });

    it('can load instance', () => {
        expect(comp).toBeTruthy();
    });

    it('volumeOptions defaults to: []', () => {
        expect(comp.volumeOptions).toEqual([]);
    });

    it('chapterOptions defaults to: []', () => {
        expect(comp.chapterOptions).toEqual([]);
    });

    it('pages defaults to: []', () => {
        expect(comp.pages).toEqual([]);
    });

    it('working defaults to: false', () => {
        expect(comp.working).toEqual(false);
    });

    describe('ngOnInit', () => {
        it('makes expected calls', () => {
            const comicServiceStub: ComicService = fixture.debugElement.injector.get(ComicService);
            spyOn(comp, 'gotoLastVolume');
            spyOn(comicServiceStub, 'getComic');
            comp.ngOnInit();
            expect(comp.gotoLastVolume).toHaveBeenCalled();
            expect(comicServiceStub.getComic).toHaveBeenCalled();
        });
    });

    describe('submit', () => {
        it('makes expected calls', () => {
            const comicServiceStub: ComicService = fixture.debugElement.injector.get(ComicService);
            spyOn(comp, 'submit');
            spyOn(comicServiceStub, 'uploadPage');
            comp.submit();
            expect(comp.submit).toHaveBeenCalled();
            expect(comicServiceStub.uploadPage).toHaveBeenCalled();
        });
    });

    describe('gotoLastVolume', () => {
        it('makes expected calls', () => {
            spyOn(comp, 'onVolumeChange');
            comp.gotoLastVolume();
            expect(comp.onVolumeChange).toHaveBeenCalled();
        });
    });

    describe('newChapter', () => {
        it('makes expected calls', () => {
            const comicServiceStub: ComicService = fixture.debugElement.injector.get(ComicService);
            spyOn(comp, 'onVolumeChange');
            spyOn(comicServiceStub, 'addChapter');
            comp.newChapter();
            expect(comp.onVolumeChange).toHaveBeenCalled();
            expect(comicServiceStub.addChapter).toHaveBeenCalled();
        });
    });

    describe('newVolume', () => {
        it('makes expected calls', () => {
            const comicServiceStub: ComicService = fixture.debugElement.injector.get(ComicService);
            spyOn(comp, 'gotoLastVolume');
            spyOn(comicServiceStub, 'addVolume');
            comp.newVolume();
            expect(comp.gotoLastVolume).toHaveBeenCalled();
            expect(comicServiceStub.addVolume).toHaveBeenCalled();
        });
    });

    describe('getLastChapter', () => {
        it('makes expected calls', () => {
            spyOn(comp, 'getChapterOptions');
            comp.getLastChapter();
            expect(comp.getChapterOptions).toHaveBeenCalled();
        });
    });

    describe('gotoLastChapter', () => {
        it('makes expected calls', () => {
            spyOn(comp, 'getLastChapter');
            spyOn(comp, 'onChapterChange');
            comp.gotoLastChapter();
            expect(comp.getLastChapter).toHaveBeenCalled();
            expect(comp.onChapterChange).toHaveBeenCalled();
        });
    });

    describe('onVolumeChange', () => {
        it('makes expected calls', () => {
            spyOn(comp, 'getChapterOptions');
            spyOn(comp, 'gotoLastChapter');
            comp.onVolumeChange();
            expect(comp.getChapterOptions).toHaveBeenCalled();
            expect(comp.gotoLastChapter).toHaveBeenCalled();
        });
    });

    describe('onChapterChange', () => {
        it('makes expected calls', () => {
            spyOn(comp, 'getLastPage');
            comp.onChapterChange();
            expect(comp.getLastPage).toHaveBeenCalled();
        });
    });

    describe('uploadFiles', () => {
        it('makes expected calls', () => {
            spyOn(comp, 'getLastPage');
            comp.uploadFiles();
            expect(comp.getLastPage).toHaveBeenCalled();
        });
    });

});
