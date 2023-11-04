import { Injectable } from '@angular/core';
import { Issue } from "./issue";
import { issues } from "../assets/mock-issues";

@Injectable({
  providedIn: 'root'
})
export class IssuesService {
  private issues: Issue[] = issues;

  constructor() { }

  getPendingIssues(): Issue[] {
    return this.issues.filter(issue => !issue.completedAt);
  }

  createIssue(issue: Issue): void {
    issue.issueNumber = this.issues.length + 1;
    this.issues.push(issue);
  }

  completeIssue(issue: Issue): void {
    const selectedIsssue: Issue = {
      ...issue,
      completedAt: new Date()
    };
    const index = this.issues.findIndex(issue => issue.issueNumber === selectedIsssue.issueNumber);
    this.issues[index] = selectedIsssue;
  }

  getSuggestions(title: string): Issue[] {
    if (title.length > 3) {
      return this.issues.filter(issue => issue.title.includes(title));
    }
    return [];
  }
}
