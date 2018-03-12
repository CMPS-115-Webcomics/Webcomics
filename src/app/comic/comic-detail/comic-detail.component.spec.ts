import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ComicService } from '../comic.service';
import { Comic } from '../comic';
import { Volume } from '../comic';
import { AuthenticationService } from '../../user/authentication.service';
import { ComicDetailComponent } from './comic-detail.component';

describe('ComicDetailComponent', () => {
    let comp: ComicDetailComponent;
    let fixture: ComponentFixture<ComicDetailComponent>;

    beforeEach(() => {
        const activatedRouteStub = {
            snapshot: {
                paramMap: {
                    get: () => ({})
                }
            }
        };
        const routerStub = {
            navigateByUrl: () => ({})
        };
        const comicServiceStub = {
            delete: () => ({
                then: () => Promise.resolve(true)
            }),
            myComics: {
                find: () => Promise.resolve(true)
            },
            getComic: () => ({
                then: () => Promise.resolve(true)
            })
        };
        const comicStub = {
            comicURL: {},
            owner: {
                profileURL: {}
            }
        };
        const volumeStub = {
            volumeID: {}
        };
        const authenticationServiceStub = {
            openChallengePrompt: () => Promise.resolve(true)
        };
        TestBed.configureTestingModule({
            declarations: [ ComicDetailComponent ],
            schemas: [ NO_ERRORS_SCHEMA ],
            providers: [
                { provide: ActivatedRoute, useValue: activatedRouteStub },
                { provide: Router, useValue: routerStub },
                { provide: ComicService, useValue: comicServiceStub },
                { provide: Comic, useValue: comicStub },
                { provide: Volume, useValue: volumeStub },
                { provide: AuthenticationService, useValue: authenticationServiceStub }
            ]
        });
        fixture = TestBed.createComponent(ComicDetailComponent);
        comp = fixture.componentInstance;
    });

    it('can load instance', () => {
        expect(comp).toBeTruthy();
    });

    it('urlActive defaults to: false', () => {
        expect(comp.urlActive).toEqual(false);
    });

    it('profileURL defaults to: []', () => {
        expect(comp.profileURL).toEqual([]);
    });

    describe('delete', () => {
        it('makes expected calls', async () => {
            const routerStub: Router = fixture.debugElement.injector.get(Router);
            const comicServiceStub: ComicService = fixture.debugElement.injector.get(ComicService);
            const authenticationServiceStub: AuthenticationService = fixture.debugElement.injector.get(AuthenticationService);

            spyOn(routerStub, 'navigateByUrl');
            spyOn(comicServiceStub, 'delete');
            spyOn(authenticationServiceStub, 'openChallengePrompt');

            comp.comic = {title: ''} as Comic;

            await comp.delete();

            expect(routerStub.navigateByUrl).toHaveBeenCalled();
            expect(comicServiceStub.delete).toHaveBeenCalled();
            expect(authenticationServiceStub.openChallengePrompt).toHaveBeenCalled();
        });
    });

    describe('ngOnInit', () => {
        it('makes expected calls', () => {
            spyOn(comp, 'getComic');
            comp.ngOnInit();
            expect(comp.getComic).toHaveBeenCalled();
        });
    });

    describe('getComic', () => {
        it('makes expected calls', () => {
            const comicServiceStub: ComicService = fixture.debugElement.injector.get(ComicService);
            spyOn(comp, 'loadComic');
            spyOn(comicServiceStub, 'getComic');
            comp.getComic();
            expect(comp.loadComic).toHaveBeenCalled();
            expect(comicServiceStub.getComic).toHaveBeenCalled();
        });
    });

});
