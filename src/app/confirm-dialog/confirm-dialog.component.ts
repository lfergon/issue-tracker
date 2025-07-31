import { Component, input, output } from '@angular/core';
import { ClrModalModule } from '@clr/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
  imports: [ClrModalModule, CommonModule],
})
export class ConfirmDialogComponent {
  readonly issueNumber = input(0);

  readonly confirm = output<boolean>();

  agree() {
    this.confirm.emit(true);
  }

  disagree() {
    this.confirm.emit(false);
  }
}
