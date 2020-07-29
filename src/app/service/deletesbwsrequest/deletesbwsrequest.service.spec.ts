import { TestBed } from '@angular/core/testing';

import { DeletesbwsrequestService } from './deletesbwsrequest.service';

describe('DeletesbwsrequestService', () => {
  let service: DeletesbwsrequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeletesbwsrequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
