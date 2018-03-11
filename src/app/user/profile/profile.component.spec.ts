import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComicService } from '../../comic/comic.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProfileService } from '../profile-service.service';
import { AuthenticationService } from '../authentication.service';
import { ImagesService } from '../../comic/images.service';
import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
    let comp: ProfileComponent;
    let fixture: ComponentFixture<ProfileComponent>;

    beforeEach(() => {
        const comicServiceStub = {};
        const activatedRouteStub = {
            snapshot: {
                paramMap: {
                    get: () => ({})
                }
            }
        };
        const routerStub = {};
        const profileServiceStub = {
            getUserProfile: () => ({
                then: () => ({})
            })
        };
        const authenticationServiceStub = {};
        const imagesServiceStub = {
            getImageUrl: () => ({})
        };
        TestBed.configureTestingModule({
            declarations: [ ProfileComponent ],
            schemas: [ NO_ERRORS_SCHEMA ],
            providers: [
                { provide: ComicService, useValue: comicServiceStub },
                { provide: ActivatedRoute, useValue: activatedRouteStub },
                { provide: Router, useValue: routerStub },
                { provide: ProfileService, useValue: profileServiceStub },
                { provide: AuthenticationService, useValue: authenticationServiceStub },
                { provide: ImagesService, useValue: imagesServiceStub }
            ]
        });
        fixture = TestBed.createComponent(ProfileComponent);
        comp = fixture.componentInstance;
    });

    it('can load instance', () => {
        expect(comp).toBeTruthy();
    });

    it('comics defaults to: []', () => {
        expect(comp.comics).toEqual([]);
    });

    it('profileEnabled defaults to: true', () => {
        expect(comp.profileEnabled).toEqual(true);
    });

    describe('ngOnInit', () => {
        it('makes expected calls', () => {
            const profileServiceStub: ProfileService = fixture.debugElement.injector.get(ProfileService);
            spyOn(profileServiceStub, 'getUserProfile');
            comp.ngOnInit();
            expect(profileServiceStub.getUserProfile).toHaveBeenCalled();
        });
    });

});
