import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
    let comp: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(() => {
        const httpClientStub = {};
        const authenticationServiceStub = {
            login: () => ({
                then: () => ({
                    catch: () => ({})
                })
            }),
            requestPasswordReset: () => ({
                then: () => ({
                    catch: () => ({})
                })
            })
        };
        const routerStub = {
            navigate: () => ({})
        };
        TestBed.configureTestingModule({
            declarations: [ LoginComponent ],
            schemas: [ NO_ERRORS_SCHEMA ],
            providers: [
                { provide: HttpClient, useValue: httpClientStub },
                { provide: AuthenticationService, useValue: authenticationServiceStub },
                { provide: Router, useValue: routerStub }
            ]
        });
        fixture = TestBed.createComponent(LoginComponent);
        comp = fixture.componentInstance;
    });

    it('can load instance', () => {
        expect(comp).toBeTruthy();
    });

    it('hide defaults to: true', () => {
        expect(comp.hide).toEqual(true);
    });

    it('working defaults to: false', () => {
        expect(comp.working).toEqual(false);
    });

    describe('submit', () => {
        it('makes expected calls', () => {
            const authenticationServiceStub: AuthenticationService = fixture.debugElement.injector.get(AuthenticationService);
            const routerStub: Router = fixture.debugElement.injector.get(Router);
            spyOn(comp, 'startRequest');
            spyOn(authenticationServiceStub, 'login');
            spyOn(routerStub, 'navigate');
            comp.submit();
            expect(comp.startRequest).toHaveBeenCalled();
            expect(authenticationServiceStub.login).toHaveBeenCalled();
            expect(routerStub.navigate).toHaveBeenCalled();
        });
    });

    describe('reset', () => {
        it('makes expected calls', () => {
            const authenticationServiceStub: AuthenticationService = fixture.debugElement.injector.get(AuthenticationService);
            spyOn(comp, 'startRequest');
            spyOn(comp, 'endRequest');
            spyOn(authenticationServiceStub, 'requestPasswordReset');
            comp.reset();
            expect(comp.startRequest).toHaveBeenCalled();
            expect(comp.endRequest).toHaveBeenCalled();
            expect(authenticationServiceStub.requestPasswordReset).toHaveBeenCalled();
        });
    });

});
