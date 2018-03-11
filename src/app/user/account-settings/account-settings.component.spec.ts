import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { ProfileService } from '../profile-service.service';
import { AccountSettingsComponent } from './account-settings.component';

describe('AccountSettingsComponent', () => {
    let comp: AccountSettingsComponent;
    let fixture: ComponentFixture<AccountSettingsComponent>;

    beforeEach(() => {
        const httpClientStub = {};
        const authenticationServiceStub = {
            onAuth: () => ({})
        };
        const routerStub = {};
        const profileServiceStub = {
            getMyProfile: () => ({
                then: () => ({})
            }),
            updateUsername: () => ({
                then: () => ({
                    catch: () => ({})
                })
            }),
            updateEmail: () => ({
                then: () => ({
                    catch: () => ({})
                })
            }),
            updateBiography: () => ({
                then: () => ({
                    catch: () => ({})
                })
            }),
            enableProfile: () => ({
                then: () => ({
                    catch: () => ({})
                })
            })
        };
        TestBed.configureTestingModule({
            declarations: [ AccountSettingsComponent ],
            schemas: [ NO_ERRORS_SCHEMA ],
            providers: [
                { provide: HttpClient, useValue: httpClientStub },
                { provide: AuthenticationService, useValue: authenticationServiceStub },
                { provide: Router, useValue: routerStub },
                { provide: ProfileService, useValue: profileServiceStub }
            ]
        });
        fixture = TestBed.createComponent(AccountSettingsComponent);
        comp = fixture.componentInstance;
    });

    it('can load instance', () => {
        expect(comp).toBeTruthy();
    });

    it('profileEnabled defaults to: true', () => {
        expect(comp.profileEnabled).toEqual(true);
    });

    it('working defaults to: false', () => {
        expect(comp.working).toEqual(false);
    });

    describe('updateUsername', () => {
        it('makes expected calls', () => {
            const profileServiceStub: ProfileService = fixture.debugElement.injector.get(ProfileService);
            spyOn(comp, 'startRequest');
            spyOn(comp, 'endRequest');
            spyOn(comp, 'handleError');
            spyOn(profileServiceStub, 'updateUsername');
            comp.updateUsername();
            expect(comp.startRequest).toHaveBeenCalled();
            expect(comp.endRequest).toHaveBeenCalled();
            expect(comp.handleError).toHaveBeenCalled();
            expect(profileServiceStub.updateUsername).toHaveBeenCalled();
        });
    });

    describe('updateEmail', () => {
        it('makes expected calls', () => {
            const profileServiceStub: ProfileService = fixture.debugElement.injector.get(ProfileService);
            spyOn(comp, 'startRequest');
            spyOn(comp, 'endRequest');
            spyOn(comp, 'handleError');
            spyOn(profileServiceStub, 'updateEmail');
            comp.updateEmail();
            expect(comp.startRequest).toHaveBeenCalled();
            expect(comp.endRequest).toHaveBeenCalled();
            expect(comp.handleError).toHaveBeenCalled();
            expect(profileServiceStub.updateEmail).toHaveBeenCalled();
        });
    });

    describe('updateBiography', () => {
        it('makes expected calls', () => {
            const profileServiceStub: ProfileService = fixture.debugElement.injector.get(ProfileService);
            spyOn(comp, 'startRequest');
            spyOn(comp, 'endRequest');
            spyOn(comp, 'handleError');
            spyOn(profileServiceStub, 'updateBiography');
            comp.updateBiography();
            expect(comp.startRequest).toHaveBeenCalled();
            expect(comp.endRequest).toHaveBeenCalled();
            expect(comp.handleError).toHaveBeenCalled();
            expect(profileServiceStub.updateBiography).toHaveBeenCalled();
        });
    });

    describe('enableProfile', () => {
        it('makes expected calls', () => {
            const profileServiceStub: ProfileService = fixture.debugElement.injector.get(ProfileService);
            spyOn(comp, 'startRequest');
            spyOn(comp, 'endRequest');
            spyOn(comp, 'handleError');
            spyOn(profileServiceStub, 'enableProfile');
            comp.enableProfile();
            expect(comp.startRequest).toHaveBeenCalled();
            expect(comp.endRequest).toHaveBeenCalled();
            expect(comp.handleError).toHaveBeenCalled();
            expect(profileServiceStub.enableProfile).toHaveBeenCalled();
        });
    });

});
