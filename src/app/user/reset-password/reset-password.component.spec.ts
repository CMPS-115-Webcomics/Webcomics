import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { ResetPasswordComponent } from './reset-password.component';

describe('ResetPasswordComponent', () => {
    let comp: ResetPasswordComponent;
    let fixture: ComponentFixture<ResetPasswordComponent>;

    beforeEach(() => {
        const activatedRouteStub = {
            snapshot: {
                paramMap: {
                    get: () => ({})
                }
            }
        };
        const authenticationServiceStub = {
            resetPassword: () => ({
                then: () => ({
                    catch: () => ({})
                })
            })
        };
        TestBed.configureTestingModule({
            declarations: [ ResetPasswordComponent ],
            schemas: [ NO_ERRORS_SCHEMA ],
            providers: [
                { provide: ActivatedRoute, useValue: activatedRouteStub },
                { provide: AuthenticationService, useValue: authenticationServiceStub }
            ]
        });
        fixture = TestBed.createComponent(ResetPasswordComponent);
        comp = fixture.componentInstance;
    });

    it('can load instance', () => {
        expect(comp).toBeTruthy();
    });

    it('hide defaults to: true', () => {
        expect(comp.hide).toEqual(true);
    });

    describe('submit', () => {
        it('makes expected calls', () => {
            const authenticationServiceStub: AuthenticationService = fixture.debugElement.injector.get(AuthenticationService);
            spyOn(authenticationServiceStub, 'resetPassword');
            comp.submit();
            expect(authenticationServiceStub.resetPassword).toHaveBeenCalled();
        });
    });

});
