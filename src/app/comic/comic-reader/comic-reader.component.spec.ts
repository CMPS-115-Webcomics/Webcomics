import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ComicService } from '../comic.service';
import { Comic } from '../comic';
import { Page } from '../comic';
import { HotkeysService } from 'angular2-hotkeys';
import { ComicReaderComponent } from './comic-reader.component';

describe('ComicReaderComponent', () => {
    let comp: ComicReaderComponent;
    let fixture: ComponentFixture<ComicReaderComponent>;

    beforeEach(() => {
        const activatedRouteStub = {
            params: {
                subscribe: () => ({})
            }
        };
        const routerStub = {
            events: {
                subscribe: () => ({})
            },
            navigateByUrl: () => ({})
        };
        const comicServiceStub = {
            getCachedComic: () => ({
                then: () => ({})
            }),
            getComic: () => ({
                then: () => ({})
            }),
            addPageRead: () => ({}),
            pagesRead: {
                has: () => ({})
            }
        };
        const comicStub = {};
        const pageStub = {
            chapterID: {},
            pageNumber: {}
        };
        const hotkeysServiceStub = {
            add: () => ({}),
            remove: () => ({})
        };
        TestBed.configureTestingModule({
            declarations: [ ComicReaderComponent ],
            schemas: [ NO_ERRORS_SCHEMA ],
            providers: [
                { provide: ActivatedRoute, useValue: activatedRouteStub },
                { provide: Router, useValue: routerStub },
                { provide: ComicService, useValue: comicServiceStub },
                { provide: Comic, useValue: comicStub },
                { provide: Page, useValue: pageStub },
                { provide: HotkeysService, useValue: hotkeysServiceStub }
            ]
        });
        fixture = TestBed.createComponent(ComicReaderComponent);
        comp = fixture.componentInstance;
    });

    it('can load instance', () => {
        expect(comp).toBeTruthy();
    });

    it('comic defaults to: Comic.empty', () => {
        expect(comp.comic).toEqual(Comic.empty);
    });

    it('page defaults to: Page.empty', () => {
        expect(comp.page).toEqual(Page.empty);
    });

    it('imageLoading defaults to: true', () => {
        expect(comp.imageLoading).toEqual(true);
    });

    describe('ngAfterViewInit', () => {
        it('makes expected calls', () => {
            spyOn(comp, 'preloadNextPages');
            comp.ngAfterViewInit();
            expect(comp.preloadNextPages).toHaveBeenCalled();
        });
    });

    describe('ngOnInit', () => {
        it('makes expected calls', () => {
            spyOn(comp, 'handleRoute');
            comp.ngOnInit();
            expect(comp.handleRoute).toHaveBeenCalled();
        });
    });

    describe('handleRoute', () => {
        it('makes expected calls', () => {
            const comicServiceStub: ComicService = fixture.debugElement.injector.get(ComicService);
            spyOn(comp, 'loadURLPage');
            spyOn(comp, 'loadComic');
            spyOn(comicServiceStub, 'getCachedComic');
            spyOn(comicServiceStub, 'getComic');
            comp.handleRoute();
            expect(comp.loadURLPage).toHaveBeenCalled();
            expect(comp.loadComic).toHaveBeenCalled();
            expect(comicServiceStub.getCachedComic).toHaveBeenCalled();
            expect(comicServiceStub.getComic).toHaveBeenCalled();
        });
    });

    describe('updatePage', () => {
        it('makes expected calls', () => {
            const comicServiceStub: ComicService = fixture.debugElement.injector.get(ComicService);
            spyOn(comicServiceStub, 'addPageRead');
            comp.updatePage();
            expect(comicServiceStub.addPageRead).toHaveBeenCalled();
        });
    });

    describe('reload', () => {
        it('makes expected calls', () => {
            const routerStub: Router = fixture.debugElement.injector.get(Router);
            spyOn(comp, 'getURL');
            spyOn(routerStub, 'navigateByUrl');
            comp.reload();
            expect(comp.getURL).toHaveBeenCalled();
            expect(routerStub.navigateByUrl).toHaveBeenCalled();
        });
    });

    describe('prevPage', () => {
        it('makes expected calls', () => {
            spyOn(comp, 'hasPrevPage');
            spyOn(comp, 'reload');
            comp.prevPage();
            expect(comp.hasPrevPage).toHaveBeenCalled();
            expect(comp.reload).toHaveBeenCalled();
        });
    });

    describe('firstPage', () => {
        it('makes expected calls', () => {
            spyOn(comp, 'hasPrevPage');
            spyOn(comp, 'reload');
            comp.firstPage();
            expect(comp.hasPrevPage).toHaveBeenCalled();
            expect(comp.reload).toHaveBeenCalled();
        });
    });

    describe('nextPage', () => {
        it('makes expected calls', () => {
            spyOn(comp, 'hasNextPage');
            spyOn(comp, 'reload');
            comp.nextPage();
            expect(comp.hasNextPage).toHaveBeenCalled();
            expect(comp.reload).toHaveBeenCalled();
        });
    });

    describe('randomPage', () => {
        it('makes expected calls', () => {
            spyOn(comp, 'hasRandomPage');
            spyOn(comp, 'reload');
            comp.randomPage();
            expect(comp.hasRandomPage).toHaveBeenCalled();
            expect(comp.reload).toHaveBeenCalled();
        });
    });

    describe('lastPage', () => {
        it('makes expected calls', () => {
            spyOn(comp, 'hasNextPage');
            spyOn(comp, 'reload');
            comp.lastPage();
            expect(comp.hasNextPage).toHaveBeenCalled();
            expect(comp.reload).toHaveBeenCalled();
        });
    });

    describe('smartSkip', () => {
        it('makes expected calls', () => {
            spyOn(comp, 'hasSmartSkip');
            spyOn(comp, 'lastPage');
            spyOn(comp, 'reload');
            comp.smartSkip();
            expect(comp.hasSmartSkip).toHaveBeenCalled();
            expect(comp.lastPage).toHaveBeenCalled();
            expect(comp.reload).toHaveBeenCalled();
        });
    });

    describe('smartReturn', () => {
        it('makes expected calls', () => {
            spyOn(comp, 'hasSmartReturn');
            spyOn(comp, 'firstPage');
            spyOn(comp, 'reload');
            comp.smartReturn();
            expect(comp.hasSmartReturn).toHaveBeenCalled();
            expect(comp.firstPage).toHaveBeenCalled();
            expect(comp.reload).toHaveBeenCalled();
        });
    });

});
