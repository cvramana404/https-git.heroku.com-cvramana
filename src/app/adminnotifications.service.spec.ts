import { TestBed } from '@angular/core/testing';

import { AdminnotificationsService } from './adminnotifications.service';

describe('AdminnotificationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminnotificationsService = TestBed.get(AdminnotificationsService);
    expect(service).toBeTruthy();
  });
});
