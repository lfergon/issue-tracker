import { Component, Input, Output, EventEmitter, input } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
})
export class ConfirmDialogComponent {
  issueNumber = input.required<number>();
  @Output() confirm = new EventEmitter<boolean>();

  agree() {
    this.confirm.emit(true);
    this.issueNumber = input(0);
  }

  disagree() {
    this.confirm.emit(false);
    this.issueNumber = input(0);
  }
}
