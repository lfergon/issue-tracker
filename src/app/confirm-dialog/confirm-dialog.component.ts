import {
  Component,
  Output,
  EventEmitter,
  input,
  InputSignal,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
})
export class ConfirmDialogComponent {
  issueNumber = signal(0);
  @Output() confirm = new EventEmitter<boolean>();

  agree() {
    this.confirm.emit(true);
    this.issueNumber = signal(0);
  }

  disagree() {
    this.confirm.emit(false);
    this.issueNumber = signal(0);
  }
}
