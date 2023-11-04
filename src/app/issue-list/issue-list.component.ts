import { Component, OnInit } from '@angular/core';
import { IssuesService } from '../issues.service';
import { Issue } from '../issue';
import { issues } from '../../assets/mock-issues';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css'],
})
export class IssueListComponent implements OnInit {
  showReportIssue = false;

  selectedIssue: Issue | undefined = undefined;

  protected readonly issues = issues;

  constructor(private issuesService: IssuesService) {}

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

  onConfirm(confirmed: boolean) {
    if (confirmed && this.selectedIssue) {
      this.issuesService.completeIssue(this.selectedIssue);
      this.getIssues();
    }
    this.selectedIssue = undefined;
  }
}
