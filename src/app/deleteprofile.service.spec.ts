import { TestBed } from '@angular/core/testing';

import { DeleteprofileService } from './deleteprofile.service';

describe('DeleteprofileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeleteprofileService = TestBed.get(DeleteprofileService);
    expect(service).toBeTruthy();
  });
});
