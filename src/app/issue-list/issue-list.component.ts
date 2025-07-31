import { Component, OnInit, inject } from '@angular/core';
import { IssuesService } from '../issues.service';
import { Issue } from '../issue';
import { issues } from '../../assets/mock-issues';
import { IssueReportComponent } from '../issue-report/issue-report.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CommonModule } from '@angular/common';
import { ClrDatagridModule } from '@clr/angular';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css'],
  imports: [
    IssueReportComponent,
    ConfirmDialogComponent,
    CommonModule,
    ClrDatagridModule,
  ],
  standalone: true,
})
export class IssueListComponent implements OnInit {
  showReportIssue = false;

  selectedIssue: Issue | undefined = undefined;

  protected readonly issues = issues;

  private issuesService = inject(IssuesService);

  private getIssues() {
    return this.issuesService.getPendingIssues();
  }

  ngOnInit(): void {
    this.getIssues();
  }

  onCloseReport() {
    this.showReportIssue = false;
    this.getIssues();
  }

  setSelectedIssue(issue: Issue) {
    this.selectedIssue = issue;
  }

  onConfirm(confirmed: boolean) {
    if (confirmed && this.selectedIssue) {
      this.issuesService.completeIssue(this.selectedIssue);
      this.getIssues();
    }
    this.selectedIssue = undefined;
  }
}
