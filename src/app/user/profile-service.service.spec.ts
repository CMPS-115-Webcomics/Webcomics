import { TestBed, inject } from '@angular/core/testing';

import { ProfileService } from './profile-service.service';

describe('ProfileServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileService]
    });
  });

  it('should be created', inject([ProfileService], (service: ProfileService) => {
    expect(service).toBeTruthy();
  }));
});
