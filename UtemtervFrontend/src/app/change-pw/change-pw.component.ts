import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-change-pw',
  templateUrl: './change-pw.component.html',
  styleUrls: ['./change-pw.component.css']
})
export class ChangePwComponent {
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<string>();
  @Input() errorMessage: string;
  onClose() {
    this.close.emit();
  }
  onSave(pw) {
    this.save.emit(pw);
  }
}
