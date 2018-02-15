import { TestBed, inject } from '@angular/core/testing';

import { ComicStoreService } from './comic-store.service';

describe('ComicStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComicStoreService]
    });
  });

  it('should be created', inject([ComicStoreService], (service: ComicStoreService) => {
    expect(service).toBeTruthy();
  }));
});
