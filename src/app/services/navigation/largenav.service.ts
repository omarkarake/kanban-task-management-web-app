import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LargenavService {
  header = new BehaviorSubject<string>('Platform Launch');
  toggleIconLogo = new BehaviorSubject<boolean>(false);
  header$ = this.header.asObservable();
  togoLogo$ = this.toggleIconLogo.asObservable();
  constructor() {}
}
