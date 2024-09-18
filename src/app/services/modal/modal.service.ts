import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  // This subject will keep track of which modal is open
  private modalState = new BehaviorSubject<string | null>(null);

  // Observable that other components can subscribe to
  modalState$ = this.modalState.asObservable();

  // Function to open a specific modal
  openModal(modalType: string) {
    this.modalState.next(modalType);
    console.log('Modal Opened:', modalType);
  }

  // Function to close the modal
  closeModal() {
    this.modalState.next(null);
  }
}
