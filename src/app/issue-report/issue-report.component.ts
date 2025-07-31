import { Component, OnInit, inject, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { IssuesService } from '../issues.service';
import { Issue } from '../issue';
import {
  ClrInputModule,
  ClrRadioModule,
  ClrSelectModule,
  ClrStackViewModule,
  ClrTextareaModule,
} from '@clr/angular';
import { CommonModule } from '@angular/common';

interface IssueForm {
  title: FormControl<string>;
  description: FormControl<string>;
  priority: FormControl<string>;
  type: FormControl<string>;
}

@Component({
  selector: 'app-issue-report',
  templateUrl: './issue-report.component.html',
  styleUrls: ['./issue-report.component.css'],
  imports: [
    ClrInputModule,
    ReactiveFormsModule,
    ClrStackViewModule,
    ClrTextareaModule,
    ClrRadioModule,
    ClrSelectModule,
    CommonModule,
  ],
})
export class IssueReportComponent implements OnInit {
  readonly formClose = output();

  suggestions: Issue[] = [];

  issueForm = new FormGroup<IssueForm>({
    title: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    description: new FormControl('', { nonNullable: true }),
    priority: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    type: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  private issuesService = inject(IssuesService);

  addIssue(): void {
    if (this.issueForm && this.issueForm.invalid) {
      this.issueForm.markAllAsTouched();
      return;
    }
    this.issuesService.createIssue(this.issueForm.getRawValue() as Issue);
    this.formClose.emit();
  }

  ngOnInit(): void {
    this.issueForm.controls.title.valueChanges.subscribe((title) => {
      this.suggestions = this.issuesService.getSuggestions(title);
    });
  }
}
