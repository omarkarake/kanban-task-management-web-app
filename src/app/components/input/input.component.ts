import { Component, Input, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = 'Placeholder';
  @Input() type: string = '';
  @Input() error: boolean = false;
  @Input() control: FormControl = new FormControl(''); // Use FormControl for reactive forms

  isTyping = false;
  value: string = '';

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  toggleIsActive() {
    this.isTyping = !this.isTyping;
  }

  // Handle input changes
  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    this.value = value;
    this.onChange(value);
    this.control.setValue(value); // Sync form control value
  }

  // Write a new value to the component
  writeValue(value: string | null): void {
    this.value = value || '';
    if (this.control) {
      this.control.setValue(this.value, { emitEvent: false });
    }
  }

  // Register the function to call when the input changes
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  // Register the function to call when the input is touched
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Enable or disable the control
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }
}
