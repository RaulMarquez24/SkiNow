import { TestBed } from '@angular/core/testing';

import { PuenteUserService } from './puente-user.service';

describe('PuenteUserService', () => {
  let service: PuenteUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuenteUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
