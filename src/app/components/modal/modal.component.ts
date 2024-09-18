import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() isOpen = false;

  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.isOpen = false;
    this.close.emit();
  }
}
