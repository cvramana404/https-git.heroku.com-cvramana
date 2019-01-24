import { TestBed } from '@angular/core/testing';

import { AdminresultService } from './adminresult.service';

describe('AdminresultService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminresultService = TestBed.get(AdminresultService);
    expect(service).toBeTruthy();
  });
});
