import { TestBed } from '@angular/core/testing';

import { CreatesbwsrequestService } from './createsbwsrequest.service';

describe('CreatesbwsrequestService', () => {
  let service: CreatesbwsrequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatesbwsrequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
