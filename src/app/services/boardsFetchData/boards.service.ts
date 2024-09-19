import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';  // Import the UUID function
import { Board, BoardsData } from '../../models/boards.modal';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  private dataUrl = 'assets/data.json';  // Path to your JSON file

  constructor(private http: HttpClient) {}

  // Fetch the boards data and generate UUID for each board
  getBoardsData(): Observable<BoardsData> {
    return this.http.get<BoardsData>(this.dataUrl).pipe(
      map((data: BoardsData) => {
        // Generate UUID for each board
        const boardsWithId = data.boards.map((board: Board) => ({
          ...board,
          id: uuidv4(),  // Generate unique ID for each board
        }));
        return { boards: boardsWithId };
      })
    );
  }
}
