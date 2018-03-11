import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
    let comp: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;

    beforeEach(() => {
        const httpClientStub = {};
        const authenticationServiceStub = {
            register: () => ({
                then: () => ({
                    catch: () => ({})
                })
            })
        };
        const routerStub = {
            navigate: () => ({})
        };
        TestBed.configureTestingModule({
            declarations: [ RegisterComponent ],
            schemas: [ NO_ERRORS_SCHEMA ],
            providers: [
                { provide: HttpClient, useValue: httpClientStub },
                { provide: AuthenticationService, useValue: authenticationServiceStub },
                { provide: Router, useValue: routerStub }
            ]
        });
        fixture = TestBed.createComponent(RegisterComponent);
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

    describe('create', () => {
        it('makes expected calls', () => {
            const authenticationServiceStub: AuthenticationService = fixture.debugElement.injector.get(AuthenticationService);
            const routerStub: Router = fixture.debugElement.injector.get(Router);
            spyOn(comp, 'startRequest');
            spyOn(authenticationServiceStub, 'register');
            spyOn(routerStub, 'navigate');
            comp.create();
            expect(comp.startRequest).toHaveBeenCalled();
            expect(authenticationServiceStub.register).toHaveBeenCalled();
            expect(routerStub.navigate).toHaveBeenCalled();
        });
    });

});
