import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthenticationService } from './user/authentication.service';
import { ComicService } from './comic/comic.service';
import { MessageService } from './message/message.service';
import { SearchService } from './comic/search.service';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let comp: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(() => {
        const authenticationServiceStub = {
            logout: () => ({})
        };
        const comicServiceStub = {};
        const messageServiceStub = {};
        const searchServiceStub = {
            findComics: () => ({})
        };
        TestBed.configureTestingModule({
            declarations: [ AppComponent ],
            schemas: [ NO_ERRORS_SCHEMA ],
            providers: [
                { provide: AuthenticationService, useValue: authenticationServiceStub },
                { provide: ComicService, useValue: comicServiceStub },
                { provide: MessageService, useValue: messageServiceStub },
                { provide: SearchService, useValue: searchServiceStub }
            ]
        });
        fixture = TestBed.createComponent(AppComponent);
        comp = fixture.componentInstance;
    });

    it('can load instance', () => {
        expect(comp).toBeTruthy();
    });

    describe('logout', () => {
        it('makes expected calls', () => {
            const authenticationServiceStub: AuthenticationService = fixture.debugElement.injector.get(AuthenticationService);
            spyOn(authenticationServiceStub, 'logout');
            comp.logout();
            expect(authenticationServiceStub.logout).toHaveBeenCalled();
        });
    });

    describe('searchComic', () => {
        it('makes expected calls', () => {
            const searchServiceStub: SearchService = fixture.debugElement.injector.get(SearchService);
            spyOn(searchServiceStub, 'findComics');
            comp.searchComic();
            expect(searchServiceStub.findComics).toHaveBeenCalled();
        });
    });

});
