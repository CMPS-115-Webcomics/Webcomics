import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposeOperationDialogComponent } from './confirm-operation-dialog.component';

describe('ComposeOperationDialogComponent', () => {
  let component: ComposeOperationDialogComponent;
  let fixture: ComponentFixture<ComposeOperationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComposeOperationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposeOperationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
