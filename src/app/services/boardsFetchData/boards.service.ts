import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ErrorHandlerService } from '../error-handler/error-handler.service';
import { BoardsData } from '../../models/boards.modal';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  private dataUrl = 'assets/data.json'; // Path to your JSON file

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  // Fetch the boards data with retry and error handling
  getBoardsData(): Observable<BoardsData> {
    return this.http.get<BoardsData>(this.dataUrl).pipe(
      retry(2), // Retry a failed request up to 2 times
      catchError(this.errorHandler.handleError) // Use centralized error handler
    );
  }
}
