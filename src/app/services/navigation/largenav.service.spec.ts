import { TestBed } from '@angular/core/testing';
import { LargenavService } from './largenav.service';

describe('LargenavService', () => {
  let service: LargenavService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LargenavService],
    });
    service = TestBed.inject(LargenavService);
  });

  it('should initialize header with "Platform Launch"', () => {
    service.header$.subscribe((value) => {
      expect(value).toBe('Platform Launch');
    });
  });

  it('should allow updating the header value', () => {
    service.header.next('New Header');
    service.header$.subscribe((value) => {
      expect(value).toBe('New Header');
    });
  });

  it('should initialize toggleIconLogo with false', () => {
    service.togoLogo$.subscribe((value) => {
      expect(value).toBe(false);
    });
  });

  it('should allow updating the toggleIconLogo value', () => {
    service.toggleIconLogo.next(true);
    service.togoLogo$.subscribe((value) => {
      expect(value).toBe(true);
    });
  });
});
