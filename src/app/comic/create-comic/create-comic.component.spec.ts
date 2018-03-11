import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComicService } from '../comic.service';
import { HttpClient } from '@angular/common/http';
import { CreateComicComponent } from './create-comic.component';

describe('CreateComicComponent', () => {
    let comp: CreateComicComponent;
    let fixture: ComponentFixture<CreateComicComponent>;

    beforeEach(() => {
        const comicServiceStub = {
            createComic: () => ({
                then: () => ({
                    catch: () => ({})
                })
            })
        };
        const httpClientStub = {};
        TestBed.configureTestingModule({
            declarations: [ CreateComicComponent ],
            schemas: [ NO_ERRORS_SCHEMA ],
            providers: [
                { provide: ComicService, useValue: comicServiceStub },
                { provide: HttpClient, useValue: httpClientStub }
            ]
        });
        fixture = TestBed.createComponent(CreateComicComponent);
        comp = fixture.componentInstance;
    });

    it('can load instance', () => {
        expect(comp).toBeTruthy();
    });

    it('organization defaults to: chapters', () => {
        expect(comp.organization).toEqual('chapters');
    });

    it('working defaults to: false', () => {
        expect(comp.working).toEqual(false);
    });

    describe('submitComic', () => {
        it('makes expected calls', () => {
            const comicServiceStub: ComicService = fixture.debugElement.injector.get(ComicService);
            spyOn(comicServiceStub, 'createComic');
            comp.submitComic();
            expect(comicServiceStub.createComic).toHaveBeenCalled();
        });
    });

});
