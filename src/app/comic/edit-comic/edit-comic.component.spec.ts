import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComicService } from '../comic.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { EditComicComponent } from './edit-comic.component';

describe('EditComicComponent', () => {
    let comp: EditComicComponent;
    let fixture: ComponentFixture<EditComicComponent>;

    beforeEach(() => {
        const comicServiceStub = {
            getComic: () => ({
                then: () => ({})
            }),
            editComic: () => ({
                then: () => ({
                    catch: () => ({})
                })
            })
        };
        const httpClientStub = {};
        const activatedRouteStub = {
            snapshot: {
                paramMap: {
                    get: () => ({})
                }
            }
        };
        TestBed.configureTestingModule({
            declarations: [ EditComicComponent ],
            schemas: [ NO_ERRORS_SCHEMA ],
            providers: [
                { provide: ComicService, useValue: comicServiceStub },
                { provide: HttpClient, useValue: httpClientStub },
                { provide: ActivatedRoute, useValue: activatedRouteStub }
            ]
        });
        fixture = TestBed.createComponent(EditComicComponent);
        comp = fixture.componentInstance;
    });

    it('can load instance', () => {
        expect(comp).toBeTruthy();
    });

    it('working defaults to: false', () => {
        expect(comp.working).toEqual(false);
    });

    describe('ngOnInit', () => {
        it('makes expected calls', () => {
            const comicServiceStub: ComicService = fixture.debugElement.injector.get(ComicService);
            spyOn(comicServiceStub, 'getComic');
            comp.ngOnInit();
            expect(comicServiceStub.getComic).toHaveBeenCalled();
        });
    });

    describe('submitComic', () => {
        it('makes expected calls', () => {
            const comicServiceStub: ComicService = fixture.debugElement.injector.get(ComicService);
            spyOn(comicServiceStub, 'editComic');
            comp.submitComic();
            expect(comicServiceStub.editComic).toHaveBeenCalled();
        });
    });

});
