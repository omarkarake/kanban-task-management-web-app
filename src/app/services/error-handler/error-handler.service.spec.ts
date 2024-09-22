import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler.service';
import { throwError } from 'rxjs';

describe('ErrorHandlerService', () => {
  let service: ErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorHandlerService],
    });
    service = TestBed.inject(ErrorHandlerService);
  });

  it('should return a message for client-side errors', () => {
    const mockError = new HttpErrorResponse({
      error: new ErrorEvent('Network error', {
        message: 'Client-side error occurred',
      }),
    });

    service.handleError(mockError).subscribe({
      error: (errorMessage) => {
        expect(errorMessage).toBe('Client-side error: Client-side error occurred');
      },
    });
  });

  it('should return a message for server-side errors (404)', () => {
    const mockError = new HttpErrorResponse({
      status: 404,
      statusText: 'Not Found',
    });

    service.handleError(mockError).subscribe({
      error: (errorMessage) => {
        expect(errorMessage).toBe('Not Found: The requested resource could not be found.');
      },
    });
  });

  it('should return a message for server-side errors (500)', () => {
    const mockError = new HttpErrorResponse({
      status: 500,
      statusText: 'Internal Server Error',
    });

    service.handleError(mockError).subscribe({
      error: (errorMessage) => {
        expect(errorMessage).toBe('Internal Server Error: Please try again later.');
      },
    });
  });

  it('should return a message for network errors', () => {
    const mockError = new HttpErrorResponse({
      status: 0,
      statusText: 'Unknown Error',
    });

    service.handleError(mockError).subscribe({
      error: (errorMessage) => {
        expect(errorMessage).toBe('Network error: Please check your internet connection.');
      },
    });
  });

  it('should return a generic message for unknown server-side errors', () => {
    const mockError = new HttpErrorResponse({
      status: 999,
      statusText: 'Unknown Error',
    });

    service.handleError(mockError).subscribe({
      error: (errorMessage) => {
        expect(errorMessage).toBe('Server error: 999 - Unknown Error');
      },
    });
  });
});
