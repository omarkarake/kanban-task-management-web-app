import { TestBed } from '@angular/core/testing';
import { BoardsService } from './boards.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { v4 as uuidv4 } from 'uuid';  // Import the UUID function
import { BoardsData } from '../../models/boards.modal';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mocked-uuid'), // Mock the UUID generation
}));

describe('BoardsService', () => {
  let service: BoardsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BoardsService],
    });

    service = TestBed.inject(BoardsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding HTTP requests
  });

  it('should fetch boards data and generate UUID for each board', () => {
    const mockResponse: BoardsData = {
      boards: [
        { id: 'mocked-uuid', name: 'Board 1', columns: [] },
        { id: 'mocked-uuid', name: 'Board 2', columns: [] },
      ],
    };

    service.getBoardsData().subscribe((data) => {
      expect(data.boards.length).toBe(2);
      expect(data.boards[0].id).toBe('mocked-uuid');
      expect(data.boards[1].id).toBe('mocked-uuid');
    });

    const req = httpMock.expectOne('assets/data.json'); // Ensure the correct URL is called
    expect(req.request.method).toBe('GET');

    // Respond with mock data
    req.flush(mockResponse);
  });
});
