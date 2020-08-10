import { TestBed } from '@angular/core/testing';

import { AddAdminUserServiceService } from './addadminuserservice.service';

describe('AddAdminUserServiceService', () => {
  let service: AddAdminUserServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddAdminUserServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
