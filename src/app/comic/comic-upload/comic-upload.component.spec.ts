import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicUploadComponent } from './comic-upload.component';

describe('ComicUploadComponent', () => {
  let component: ComicUploadComponent;
  let fixture: ComponentFixture<ComicUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComicUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
