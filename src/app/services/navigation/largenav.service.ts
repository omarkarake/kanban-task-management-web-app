import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LargenavService {
  header = new BehaviorSubject<string>('Platform Launch');
  header$ = this.header.asObservable();
  constructor() {}
}
