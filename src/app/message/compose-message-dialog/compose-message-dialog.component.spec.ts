import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ComposeMessageDialogComponent } from './compose-message-dialog.component';

describe('ComposeMessageDialogComponent', () => {
    let comp: ComposeMessageDialogComponent;
    let fixture: ComponentFixture<ComposeMessageDialogComponent>;

    beforeEach(() => {
        const matDialogRefStub = {
            close: () => ({})
        };
        TestBed.configureTestingModule({
            declarations: [ ComposeMessageDialogComponent ],
            schemas: [ NO_ERRORS_SCHEMA ],
            providers: [
                { provide: MatDialogRef, useValue: matDialogRefStub }
            ]
        });
        fixture = TestBed.createComponent(ComposeMessageDialogComponent);
        comp = fixture.componentInstance;
    });

    it('can load instance', () => {
        expect(comp).toBeTruthy();
    });


});
