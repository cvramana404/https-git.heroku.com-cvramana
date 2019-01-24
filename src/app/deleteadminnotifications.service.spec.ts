import { TestBed } from '@angular/core/testing';

import { DeleteadminnotificationsService } from './deleteadminnotifications.service';

describe('DeleteadminnotificationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeleteadminnotificationsService = TestBed.get(DeleteadminnotificationsService);
    expect(service).toBeTruthy();
  });
});
