import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComicService } from '../comic.service';
import { ComicStoreService } from '../comic-store.service';
import { Comic } from '../comic';
import { MessageService } from '../../message/message.service';
import { AuthenticationService } from '../../user/authentication.service';
import { SearchService } from '../search.service';
import { ComicListComponent } from './comic-list.component';

describe('ComicListComponent', () => {
    let comp: ComicListComponent;
    let fixture: ComponentFixture<ComicListComponent>;
    let comicStub;

    beforeEach(() => {
        const comicServiceStub = {
            getComics: () => ({}),
            comics: {},
            delete: () => ({})
        };
        const comicStoreServiceStub = {};
         comicStub = {
            accountID: {},
            title: {}
        };
        const messageServiceStub = {
            openMessageDialog: () => ({})
        };
        const authenticationServiceStub = {
            openChallengePrompt: () => ({}),
            ban: () => ({})
        };
        const searchServiceStub = {
            onSearch: {}
        };
        TestBed.configureTestingModule({
            declarations: [ ComicListComponent ],
            schemas: [ NO_ERRORS_SCHEMA ],
            providers: [
                { provide: ComicService, useValue: comicServiceStub },
                { provide: ComicStoreService, useValue: comicStoreServiceStub },
                { provide: Comic, useValue: comicStub },
                { provide: MessageService, useValue: messageServiceStub },
                { provide: AuthenticationService, useValue: authenticationServiceStub },
                { provide: SearchService, useValue: searchServiceStub }
            ]
        });
        fixture = TestBed.createComponent(ComicListComponent);
        comp = fixture.componentInstance;
    });

    it('can load instance', () => {
        expect(comp).toBeTruthy();
    });

    it('comics defaults to: []', () => {
        expect(comp.comics).toEqual([]);
    });

    describe('message', () => {
        it('makes expected calls', () => {
            const messageServiceStub: MessageService = fixture.debugElement.injector.get(MessageService);
            spyOn(messageServiceStub, 'openMessageDialog');
            comp.message(comicStub);
            expect(messageServiceStub.openMessageDialog).toHaveBeenCalled();
        });
    });

    describe('delete', () => {
        it('makes expected calls', () => {
            const comicServiceStub: ComicService = fixture.debugElement.injector.get(ComicService);
            const authenticationServiceStub: AuthenticationService = fixture.debugElement.injector.get(AuthenticationService);
            spyOn(comicServiceStub, 'delete');
            spyOn(authenticationServiceStub, 'openChallengePrompt');
            comp.delete(comicStub);
            expect(comicServiceStub.delete).toHaveBeenCalled();
            expect(authenticationServiceStub.openChallengePrompt).toHaveBeenCalled();
        });
    });

    describe('banOwner', () => {
        it('makes expected calls', () => {
            const authenticationServiceStub: AuthenticationService = fixture.debugElement.injector.get(AuthenticationService);
            spyOn(authenticationServiceStub, 'openChallengePrompt');
            spyOn(authenticationServiceStub, 'ban');
            comp.banOwner(comicStub);
            expect(authenticationServiceStub.openChallengePrompt).toHaveBeenCalled();
            expect(authenticationServiceStub.ban).toHaveBeenCalled();
        });
    });

    describe('ngOnInit', () => {
        it('makes expected calls', () => {
            const comicServiceStub: ComicService = fixture.debugElement.injector.get(ComicService);
            spyOn(comicServiceStub, 'getComics');
            comp.ngOnInit();
            expect(comicServiceStub.getComics).toHaveBeenCalled();
        });
    });

});
