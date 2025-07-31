import { Component } from '@angular/core';
import { IssueListComponent } from './issue-list/issue-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [IssueListComponent],
})
export class AppComponent {
  title = 'issue-tracker';
}
