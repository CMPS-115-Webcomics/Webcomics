import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ComposeOperationDialogComponent } from './confirm-operation-dialog.component';

describe('ComposeOperationDialogComponent', () => {
    let comp: ComposeOperationDialogComponent;
    let fixture: ComponentFixture<ComposeOperationDialogComponent>;

    beforeEach(() => {
        const matDialogRefStub = {
            close: () => ({})
        };
        TestBed.configureTestingModule({
            declarations: [ ComposeOperationDialogComponent ],
            schemas: [ NO_ERRORS_SCHEMA ],
            providers: [
                { provide: MatDialogRef, useValue: matDialogRefStub }
            ]
        });
        fixture = TestBed.createComponent(ComposeOperationDialogComponent);
        comp = fixture.componentInstance;
    });

    it('can load instance', () => {
        expect(comp).toBeTruthy();
    });

    describe('done', () => {
        it('makes expected calls', () => {
            const matDialogRefStub: MatDialogRef = fixture.debugElement.injector.get(MatDialogRef);
            spyOn(matDialogRefStub, 'close');
            comp.done();
            expect(matDialogRefStub.close).toHaveBeenCalled();
        });
    });

    describe('cancel', () => {
        it('makes expected calls', () => {
            const matDialogRefStub: MatDialogRef = fixture.debugElement.injector.get(MatDialogRef);
            spyOn(matDialogRefStub, 'close');
            comp.cancel();
            expect(matDialogRefStub.close).toHaveBeenCalled();
        });
    });

});
