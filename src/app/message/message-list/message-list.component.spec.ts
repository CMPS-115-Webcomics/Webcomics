import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MessageService } from '../message.service';
import { MessageListComponent } from './message-list.component';

describe('MessageListComponent', () => {
    let comp: MessageListComponent;
    let fixture: ComponentFixture<MessageListComponent>;

    beforeEach(() => {
        const messageServiceStub = {
            getMessages: () => ({
                then: () => ({})
            })
        };
        TestBed.configureTestingModule({
            declarations: [ MessageListComponent ],
            schemas: [ NO_ERRORS_SCHEMA ],
            providers: [
                { provide: MessageService, useValue: messageServiceStub }
            ]
        });
        fixture = TestBed.createComponent(MessageListComponent);
        comp = fixture.componentInstance;
    });

    it('can load instance', () => {
        expect(comp).toBeTruthy();
    });

});
