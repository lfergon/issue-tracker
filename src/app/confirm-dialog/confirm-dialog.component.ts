import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  @Input() issueNumber: number | undefined = undefined;
  @Output() confirm = new EventEmitter<boolean>();

  agree() {
    this.confirm.emit(true);
    this.issueNumber = undefined;
  }

  disagree() {
    this.confirm.emit(false);
    this.issueNumber = undefined;
  }
}
