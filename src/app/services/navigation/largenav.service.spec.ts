import { TestBed } from '@angular/core/testing';

import { LargenavService } from './largenav.service';

describe('LargenavService', () => {
  let service: LargenavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LargenavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
